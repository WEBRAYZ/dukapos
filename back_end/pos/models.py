from django.db import models
from django.conf import settings
from inventory.models import Branch
from customers.models import Customer
from shifts.models import CashierShift
from products.models import Product

class Sale(models.Model):
    PAYMENT_MODES = [
        ('01', 'Cash'),
        ('02', 'Credit'),
        ('03', 'M-Pesa'),
    ]

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("COMPLETED", "Completed"),
        ("REFUNDED", "Refunded"),
        ("CANCELLED", "Cancelled")
    ]

    sale_number = models.CharField(max_length=100, unique=True)
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT, related_name='sales')
    shift = models.ForeignKey(CashierShift, on_delete=models.PROTECT, related_name='sales')
    cashier = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='pos_sales')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='pos_sales')
    
    timestamp = models.DateTimeField(auto_now_add=True)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    
    payment_mode = models.CharField(max_length=2, choices=PAYMENT_MODES, default='01')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='COMPLETED')

    # External Payment Gateway Parameters
    mpesa_checkout_id = models.CharField(max_length=100, blank=True, null=True)
    mpesa_receipt = models.CharField(max_length=50, blank=True, null=True)
    
    # Tax Compliance Output Hooks (KRA eTIMS)
    kra_invoice_signature = models.TextField(blank=True, null=True)
    kra_qr_string = models.TextField(blank=True, null=True) # For Next.js QR generation

    def __str__(self):
        return f"Sale {self.sale_number} - {self.total_amount}"

class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='sold_items')
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Sale {self.sale.sale_number})"

class Receipt(models.Model):
    sale = models.OneToOneField(Sale, on_delete=models.CASCADE, related_name='receipt')
    receipt_number = models.CharField(max_length=100, unique=True)
    printed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Receipt {self.receipt_number}"

class Cart(models.Model):
    cashier = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='active_carts')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart {self.id} - {self.cashier.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=12, decimal_places=2, default=1.00)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
