from django.contrib.auth.models import AbstractUser
from django.db import models
from core.utils import check_limit


class CustomRole(models.Model):
    name = models.CharField(max_length=50) # e.g., "Senior Cashier", "Store Manager"
    can_void_sales = models.BooleanField(default=False)
    can_edit_inventory = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class User(AbstractUser):

    ROLE_CHOICES = [
        ("ADMIN", "Admin"),
        ("MANAGER", "Manager"),
        ("CASHIER", "Cashier"),
        ("INVENTORY", "Inventory"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="CASHIER"
    )

    custom_role = models.ForeignKey(
        CustomRole,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users"
    )

    is_tenant_admin = models.BooleanField(
        default=False,
        help_text="Designates whether the user can manage tenant-wide settings."
    )

    branch_id = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    is_active_session = models.BooleanField(
        default=False
    )

    last_login_ip = models.GenericIPAddressField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            check_limit(User, 'users')
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class BusinessProfile(models.Model):
    business_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100)
    county = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    kra_pin = models.CharField(max_length=20, blank=True, null=True)
    registration_no = models.CharField(max_length=50, blank=True, null=True)
    brand_color = models.CharField(max_length=7, default="#556B2F")
    
    # Subscription & Plans
    billing_cycle = models.CharField(max_length=20, default="monthly")
    selected_plan = models.CharField(max_length=50, default="growth")
    
    # Receipt Config
    receipt_header = models.CharField(max_length=255, blank=True, null=True)
    receipt_tagline = models.CharField(max_length=255, blank=True, null=True)
    receipt_footer = models.TextField(blank=True, null=True)
    show_vat = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.business_name
