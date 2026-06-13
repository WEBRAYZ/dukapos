from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product, ProductVariant
from .serializers import CategorySerializer, ProductSerializer, ProductVariantSerializer
from auditlogs.models import AuditLog
from notifications.utils import notify_admin

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'sku', 'barcode', 'description']
    ordering_fields = ['name', 'selling_price', 'stock_quantity', 'created_at']

    def perform_create(self, serializer):
        product = serializer.save()
        try:
            AuditLog.log_request(
                request=self.request,
                action="CREATE",
                entity_type="Product",
                entity_id=str(product.id),
                description=f"New product created: {product.name} (SKU: {product.sku})",
                severity="INFO"
            )
        except Exception as e:
            print(f"Error logging product creation: {e}")

    def perform_update(self, serializer):
        old_product = self.get_object()
        old_stock = old_product.stock_quantity
        old_price = old_product.selling_price
        
        product = serializer.save()
        
        try:
            # Log stock changes
            if old_stock != product.stock_quantity:
                AuditLog.log_request(
                    request=self.request,
                    action="STOCK_CHANGE",
                    entity_type="Product",
                    entity_id=str(product.id),
                    description=f"Stock for {product.name} changed: {old_stock} -> {product.stock_quantity}",
                    severity="INFO",
                    old_value={"stock": str(old_stock)},
                    new_value={"stock": str(product.stock_quantity)}
                )
                
                # Check for low stock alert
                if product.stock_quantity <= product.low_stock_threshold:
                    notify_admin(
                        title=f"Low Stock Alert: {product.name}",
                        message=f"Product {product.name} (SKU: {product.sku}) is below threshold. Current stock: {product.stock_quantity}",
                        notification_type="WARNING",
                        category="STOCK"
                    )

            # Log price changes
            if old_price != product.selling_price:
                AuditLog.log_request(
                    request=self.request,
                    action="PRICE_CHANGE",
                    entity_type="Product",
                    entity_id=str(product.id),
                    description=f"Price for {product.name} changed: {old_price} -> {product.selling_price}",
                    severity="WARNING",
                    old_value={"price": str(old_price)},
                    new_value={"price": str(product.selling_price)}
                )
        except Exception as e:
            print(f"Error logging product update: {e}")

    @action(detail=True, methods=['post'])
    def adjust_stock(self, request, pk=None):
        product = self.get_object()
        adjustment = float(request.data.get('adjustment', 0))
        reason = request.data.get('reason', 'Manual adjustment')
        
        old_stock = product.stock_quantity
        product.stock_quantity += adjustment
        product.save()
        
        AuditLog.log_request(
            request=request,
            action="STOCK_CHANGE",
            entity_type="Product",
            entity_id=str(product.id),
            description=f"Manual stock adjustment for {product.name}: {adjustment}. Reason: {reason}",
            severity="INFO"
        )
        
        return Response({'status': 'stock adjusted', 'new_stock': product.stock_quantity})

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
