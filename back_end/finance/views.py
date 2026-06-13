from rest_framework import viewsets, views, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
from .models import Payment, MPesaTransaction, ExpenseCategory, Expense
from .serializers import (
    PaymentSerializer, MPesaTransactionSerializer, 
    ExpenseCategorySerializer, ExpenseSerializer
)
from pos.models import Sale
from core.mpesa import MPesaService
import logging
import json
from datetime import datetime

logger = logging.getLogger(__name__)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

class ExpenseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

class InitiateSTKPushView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        sale_id = request.data.get('sale_id')
        phone_number = request.data.get('phone_number')
        amount = request.data.get('amount')

        sale = get_object_or_404(Sale, id=sale_id)
        payment = Payment.objects.create(sale=sale, amount=amount, method='MPESA', status='PENDING')

        mpesa_service = MPesaService()
        response, error = mpesa_service.stk_push(
            phone_number=phone_number, amount=amount,
            callback_url=settings.MPESA_CALLBACK_URL,
            account_reference=f"Sale-{sale.sale_number}",
            transaction_desc=f"Payment for Sale {sale.sale_number}"
        )

        if error:
            payment.status = 'FAILED'
            payment.save()
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)

        MPesaTransaction.objects.create(
            payment=payment,
            merchant_request_id=response.get('MerchantRequestID'),
            checkout_request_id=response.get('CheckoutRequestID'),
            phone_number=phone_number,
            amount=amount
        )
        return Response(response, status=status.HTTP_200_OK)

class MPesaCallbackView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data
        stk_callback = data.get('Body', {}).get('stkCallback', {})
        checkout_request_id = stk_callback.get('CheckoutRequestID')
        try:
            transaction = MPesaTransaction.objects.get(checkout_request_id=checkout_request_id)
            payment = transaction.payment
            transaction.result_code = stk_callback.get('ResultCode')
            transaction.result_description = stk_callback.get('ResultDesc')
            transaction.is_processed = True
            if transaction.result_code == 0:
                payment.status = 'COMPLETED'
                payment.sale.status = 'COMPLETED'
                payment.sale.save()
            else:
                payment.status = 'FAILED'
            payment.save()
            transaction.save()
        except MPesaTransaction.DoesNotExist:
            pass
        return Response({"ResultCode": 0, "ResultDesc": "Accepted"}, status=status.HTTP_200_OK)
from django.db.models import Sum
from decimal import Decimal

class FinancialSummaryView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_revenue = Payment.objects.filter(status='COMPLETED').aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00')
        total_expenses = Expense.objects.aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00')
        net_profit = total_revenue - total_expenses
        profit_margin = (net_profit / total_revenue * 100) if total_revenue > 0 else 0

        # Monthly breakdown for chart
        monthly_data = []
        for i in range(1, 13):
            month_rev = Payment.objects.filter(status='COMPLETED', created_at__month=i).aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00')
            month_exp = Expense.objects.filter(date__month=i).aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00')
            monthly_data.append({
                'month': datetime(2026, i, 1).strftime('%b'),
                'income': month_rev,
                'expense': month_exp
            })

        return Response({
            'total_revenue': total_revenue,
            'total_expenses': total_expenses,
            'net_profit': net_profit,
            'profit_margin': profit_margin,
            'monthly_data': monthly_data
        })

class PaymentStatusView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, checkout_request_id):
        transaction = get_object_or_404(MPesaTransaction, checkout_request_id=checkout_request_id)
        return Response({"status": transaction.payment.status})
