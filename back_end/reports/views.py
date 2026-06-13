from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count, F, Q
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
from .models import DailyFinancialSnapshot
from .serializers import DailyFinancialSnapshotSerializer
from pos.models import Sale
from products.models import Product
from customers.models import Customer
from inventory.models import Branch

class DailyFinancialSnapshotViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DailyFinancialSnapshot.objects.all()
    serializer_class = DailyFinancialSnapshotSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['branch', 'date']

class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        start_of_today = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        
        # 1. Stats
        today_sales = Sale.objects.filter(timestamp__gte=start_of_today, status='COMPLETED')
        today_revenue = today_sales.aggregate(total=Sum('total_amount'))['total'] or 0
        sales_count = today_sales.count()
        
        product_count = Product.objects.count()
        low_stock_count = Product.objects.filter(stock_quantity__lte=F('low_stock_threshold')).count()
        
        customers_today = today_sales.values('customer').distinct().count()

        # 2. Revenue Data (Last 12 Months for chart)
        # We'll take last 12 months to match the frontend chart
        twelve_months_ago = today - timedelta(days=365)
        revenue_data_raw = Sale.objects.filter(
            timestamp__date__gte=twelve_months_ago,
            status='COMPLETED'
        ).annotate(
            month_trunc=TruncMonth('timestamp')
        ).values('month_trunc').annotate(
            sales=Sum('total_amount')
        ).order_by('month_trunc')

        revenue_data = [
            {
                'month': entry['month_trunc'].strftime('%b'),
                'sales': float(entry['sales'])
            } for entry in revenue_data_raw
        ]

        # 3. Payment Data
        payment_stats = Sale.objects.filter(
            timestamp__date=today, 
            status='COMPLETED'
        ).values('payment_mode').annotate(
            count=Count('id')
        )
        
        total_today = sum(p['count'] for p in payment_stats)
        payment_mode_map = dict(Sale.PAYMENT_MODES)
        payment_data = []
        # Matching colors from frontend
        colors = ['#1e3a8a', '#16a34a', '#ea580c']
        
        for i, p in enumerate(payment_stats):
            name = payment_mode_map.get(p['payment_mode'], 'Other')
            value = (p['count'] / total_today * 100) if total_today > 0 else 0
            payment_data.append({
                'name': name,
                'value': round(value, 1),
                'fill': colors[i % len(colors)]
            })

        # 4. Recent Transactions
        recent_transactions_raw = Sale.objects.order_by('-timestamp')[:5]
        recent_transactions = [
            {
                'id': txn.sale_number,
                'customer': txn.customer.name if txn.customer else 'Walk-in',
                'amount': f"KSh {txn.total_amount:,.2f}",
                'method': txn.get_payment_mode_display(),
                'status': txn.status.lower()
            } for txn in recent_transactions_raw
        ]

        # 5. Low Stock Alerts
        low_stock_items = Product.objects.filter(
            stock_quantity__lte=F('low_stock_threshold')
        ).order_by('stock_quantity')[:3]
        
        low_stock_alerts = [
            {
                'name': item.name,
                'meta': f"{item.stock_quantity} units left",
                'status': 'CRITICAL' if item.stock_quantity == 0 else 'LOW',
                'color': 'bg-red-50 text-red-700 border-red-100' if item.stock_quantity == 0 else 'bg-orange-50 text-orange-700 border-orange-100'
            } for item in low_stock_items
        ]

        # 6. Branch Performance
        branches = Branch.objects.all()
        branch_performance = []
        for branch in branches:
            branch_sales = Sale.objects.filter(
                branch=branch, 
                timestamp__date=today,
                status='COMPLETED'
            ).aggregate(total=Sum('total_amount'))['total'] or 0
            
            branch_performance.append({
                'name': branch.name,
                'location': branch.location,
                'sales': f"KSh {branch_sales:,.2f}",
                'status': 'open'
            })

        return Response({
            'stats': {
                'todayRevenue': f"KSh {today_revenue:,.0f}",
                'salesCount': str(sales_count),
                'productCount': str(product_count),
                'lowStockCount': str(low_stock_count),
                'customersToday': str(customers_today)
            },
            'revenueData': revenue_data if revenue_data else [{"month": today.strftime('%b'), "sales": 0}],
            'paymentData': payment_data,
            'recentTransactions': recent_transactions,
            'lowStockAlerts': low_stock_alerts,
            'branchPerformance': branch_performance
        })
