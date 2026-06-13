from django.db import models

class CustomerGroup(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    CUSTOMER_TYPES = [
        ("INDIVIDUAL", "Individual"),
        ("BUSINESS", "Business")
    ]

    name = models.CharField(max_length=255)
    customer_type = models.CharField(max_length=20, choices=CUSTOMER_TYPES, default="INDIVIDUAL")
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, unique=True)
    address = models.TextField(blank=True)
    
    # KRA eTIMS & Financials
    kra_pin = models.CharField(
        max_length=20, 
        blank=True, 
        null=True, 
        help_text="Required for Corporate Tax Invoicing"
    )
    store_credit_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    
    group = models.ForeignKey(
        CustomerGroup,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="customers"
    )
    
    loyalty_points = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
