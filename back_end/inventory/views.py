from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import Branch, StockLevel, StockBatch, StockMovement
from .serializers import (
    BranchSerializer, StockLevelSerializer, 
    StockBatchSerializer, StockMovementSerializer,
    StockAdjustmentSerializer
)
from products.models import Product

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [permissions.IsAuthenticated]

class StockLevelViewSet(viewsets.ModelViewSet):
    queryset = StockLevel.objects.all()
    serializer_class = StockLevelSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['branch', 'product']

    @action(detail=False, methods=['post'], serializer_class=StockAdjustmentSerializer)
    def adjust_stock(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                data = serializer.validated_data
                product = Product.objects.get(id=data['product'])
                branch = Branch.objects.get(id=data['branch'])
                adj_type = data['type']
                qty = data['quantity']
                
                stock_level, created = StockLevel.objects.get_or_create(
                    product=product,
                    branch=branch,
                    defaults={'quantity': 0}
                )
                
                before_qty = stock_level.quantity
                
                if adj_type == 'Add Stock (+)':
                    stock_level.quantity += qty
                    move_type = 'IN'
                elif adj_type == 'Subtract Stock (-)':
                    stock_level.quantity -= qty
                    move_type = 'OUT'
                else: # Set New Level (=)
                    stock_level.quantity = qty
                    move_type = 'ADJUSTMENT'
                
                stock_level.save()
                
                # Update main product stock count if it's the main branch or just aggregate?
                # For now, let's keep it simple and just log the movement.
                # In a more complex system, we'd sync product.stock_quantity.
                
                StockMovement.objects.create(
                    product=product,
                    branch=branch,
                    type=move_type,
                    quantity=qty if adj_type != 'Set New Level (=)' else qty - before_qty,
                    before_quantity=before_qty,
                    after_quantity=stock_level.quantity,
                    reason=data['reason'],
                    reference=data.get('reference', ''),
                    user=request.user
                )
                
                return Response(StockLevelSerializer(stock_level).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StockBatchViewSet(viewsets.ModelViewSet):
    queryset = StockBatch.objects.all()
    serializer_class = StockBatchSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['branch', 'product']

class StockMovementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StockMovement.objects.all()
    serializer_class = StockMovementSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['branch', 'product', 'type']
