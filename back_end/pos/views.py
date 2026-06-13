from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
import uuid
from .models import Sale, SaleItem, Receipt, Cart, CartItem
from .serializers import (
    SaleSerializer, CartSerializer, 
    CartItemSerializer, ReceiptSerializer
)
from auditlogs.models import AuditLog

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        sale_number = f"SALE-{uuid.uuid4().hex[:8].upper()}"
        sale = serializer.save(cashier=self.request.user, sale_number=sale_number)
        
        # Automatically create a receipt
        receipt_number = f"REC-{uuid.uuid4().hex[:8].upper()}"
        Receipt.objects.create(sale=sale, receipt_number=receipt_number)
        
        AuditLog.log_request(
            request=self.request,
            action="SALE",
            entity_type="Sale",
            entity_id=str(sale.id),
            description=f"New sale completed: {sale_number} - Total: {sale.total_amount}",
            severity="INFO"
        )

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(cashier=self.request.user)

    def perform_create(self, serializer):
        serializer.save(cashier=self.request.user)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        item, created = CartItem.objects.get_or_create(
            cart=cart, product_id=product_id,
            defaults={'quantity': quantity}
        )
        if not created:
            item.quantity += float(quantity)
            item.save()
            
        return Response({'status': 'item added to cart'})

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__cashier=self.request.user)

class ReceiptViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer
    permission_classes = [permissions.IsAuthenticated]
