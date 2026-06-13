from django.db import models
from products.models import Product
from django.conf import settings

class Branch(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    etims_branch_id = models.CharField(
        max_length=5, 
        default="00",
        help_text="KRA eTIMS Branch ID (00 for Main, 01, 02 etc. for others)"
    )

    class Meta:
        verbose_name_plural = "Branches"

    def __str__(self):
        return f"{self.name} ({self.etims_branch_id})"

class StockLevel(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='stock_levels')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='stock_levels')
    quantity = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    minimum_required = models.DecimalField(max_digits=12, decimal_places=2, default=5.00)

    class Meta:
        unique_together = ('branch', 'product')

    def __str__(self):
        return f"{self.product.name} at {self.branch.name}: {self.quantity}"

class StockBatch(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='stock_batches')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='stock_batches')
    batch_number = models.CharField(max_length=100)
    expiry_date = models.DateField(null=True, blank=True)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Batch {self.batch_number} - {self.product.name} ({self.quantity})"

class StockMovement(models.Model):
    MOVEMENT_TYPES = [
        ('IN', 'Stock In'),
        ('OUT', 'Stock Out'),
        ('ADJUSTMENT', 'Adjustment'),
        ('TRANSFER', 'Transfer'),
        ('RETURN', 'Return'),
    ]
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='movements')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='movements')
    type = models.CharField(max_length=20, choices=MOVEMENT_TYPES)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    before_quantity = models.DecimalField(max_digits=12, decimal_places=2)
    after_quantity = models.DecimalField(max_digits=12, decimal_places=2)
    reason = models.CharField(max_length=255, blank=True)
    reference = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.type} - {self.product.name} ({self.quantity})"
