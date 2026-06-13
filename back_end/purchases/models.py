from django.db import models
from django.conf import settings
from suppliers.models import Supplier
from inventory.models import Branch
from products.models import Product

class PurchaseOrder(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('RECEIVED', 'Received'),
        ('CANCELLED', 'Cancelled'),
    ]

    purchase_number = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        null=True
    )
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT, related_name='purchase_orders')
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT, related_name='purchase_orders')
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    grand_total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    expected_delivery_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True, null=True)
    
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="purchase_orders_created"
    )

    def __str__(self):
        return f"PO {self.purchase_number or self.id} - {self.supplier.company_name}"

class PurchaseOrderItem(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='purchase_items')
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    unit_cost = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def save(self, *args, **kwargs):
        self.subtotal = self.quantity * self.unit_cost
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (PO {self.purchase_order.id})"
