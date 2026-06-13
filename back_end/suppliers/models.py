from django.db import models

class Supplier(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
    ]

    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    category = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    rating = models.IntegerField(default=3)
    kra_pin = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    lead_time = models.CharField(max_length=50, blank=True, null=True) # e.g. "2-3 days"
    
    # These could also be calculated properties, but storing them for simplicity in the audit view
    total_spend = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    outstanding_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    order_count = models.IntegerField(default=0)
    last_order_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name
