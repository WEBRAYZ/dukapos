from django.db import models
from core.utils import check_limit

class Category(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
        ('OUT_OF_STOCK', 'Out of Stock'),
    ]

    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True)
    barcode = models.CharField(max_length=150, unique=True, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    
    cost_price = models.DecimalField(max_digits=12, decimal_places=2)
    selling_price = models.DecimalField(max_digits=12, decimal_places=2)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=16.00)  # Standard 16% VAT
    
    stock_quantity = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    low_stock_threshold = models.DecimalField(max_digits=12, decimal_places=2, default=5.00)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE')
    
    # eTIMS Specific Fields
    item_code = models.CharField(max_length=50, null=True, blank=True)
    unspsc_code = models.CharField(max_length=50, null=True, blank=True)
    packaging_unit = models.CharField(max_length=20, default='PCS')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            check_limit(Product, 'products')
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.sku})"

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, related_name="variants", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    barcode = models.CharField(max_length=150, unique=True)
    selling_price = models.DecimalField(max_digits=12, decimal_places=2)
    stock_quantity = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.product.name} - {self.name}"
