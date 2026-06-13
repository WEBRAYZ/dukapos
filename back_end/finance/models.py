from django.db import models
from django.conf import settings
from pos.models import Sale
from inventory.models import Branch

# Existing Payment Models
class Payment(models.Model):
    PAYMENT_METHODS = [
        ('CASH', 'Cash'),
        ('MPESA', 'M-Pesa'),
        ('CARD', 'Card'),
        ('BANK_TRANSFER', 'Bank Transfer'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
        ('REFUNDED', 'Refunded'),
    ]

    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.method} payment for Sale {self.sale.sale_number} - {self.amount}"

class MPesaTransaction(models.Model):
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name='mpesa_details')
    merchant_request_id = models.CharField(max_length=100, unique=True)
    checkout_request_id = models.CharField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    mpesa_receipt_number = models.CharField(max_length=50, blank=True, null=True)
    transaction_date = models.DateTimeField(blank=True, null=True)
    result_code = models.IntegerField(blank=True, null=True)
    result_description = models.TextField(blank=True, null=True)
    is_processed = models.BooleanField(default=False)
    raw_callback_data = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"M-Pesa {self.checkout_request_id} - {self.phone_number}"

# New Expense Models
class ExpenseCategory(models.Model):
    name = models.CharField(max_length=100, unique=True) # rent, utilities, transport

    class Meta:
        verbose_name_plural = "Expense Categories"

    def __str__(self):
        return self.name

class Expense(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT, related_name='expenses')
    category = models.ForeignKey(ExpenseCategory, on_delete=models.PROTECT, related_name='expenses')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category.name} - {self.amount} ({self.date})"
