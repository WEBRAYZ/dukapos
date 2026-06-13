from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
import uuid
from .models import PurchaseOrder, PurchaseOrderItem
from .serializers import PurchaseOrderSerializer, PurchaseOrderItemSerializer
from inventory.models import StockLevel
from auditlogs.models import AuditLog

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        purchase_number = f"PO-{uuid.uuid4().hex[:8].upper()}"
        serializer.save(created_by=self.request.user, purchase_number=purchase_number)

    @action(detail=True, methods=['post'])
    def receive_order(self, request, pk=None):
        purchase_order = self.get_object()
        if purchase_order.status == 'RECEIVED':
            return Response({'error': 'Order already received'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            for item in purchase_order.items.all():
                stock, created = StockLevel.objects.get_or_create(
                    branch=purchase_order.branch,
                    product=item.product,
                    defaults={'quantity': 0}
                )
                stock.quantity += item.quantity
                stock.save()

                AuditLog.log_request(
                    request=request,
                    action="STOCK_CHANGE",
                    entity_type="Product",
                    entity_id=str(item.product.id),
                    description=f"Stock increased via PO {purchase_order.purchase_number}: +{item.quantity}",
                    severity="INFO"
                )

            purchase_order.status = 'RECEIVED'
            purchase_order.save()

        return Response({'status': 'order received and inventory updated'})

class PurchaseOrderItemViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrderItem.objects.all()
    serializer_class = PurchaseOrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]
