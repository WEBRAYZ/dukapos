from django.db import models
from tenants.models import Tenant

class SubscriptionTier(models.Model):
    name = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    max_branches = models.IntegerField(default=1)
    max_users = models.IntegerField(default=5)
    features = models.JSONField(default=dict, help_text="JSON object for feature flags")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class TenantSubscription(models.Model):
    tenant = models.OneToOneField(Tenant, on_delete=models.CASCADE, related_name='subscription')
    tier = models.ForeignKey(SubscriptionTier, on_delete=models.SET_NULL, null=True)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    auto_renew = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.tenant.company_name} - {self.tier.name if self.tier else 'No Tier'}"

class MpesaTransaction(models.Model):
    merchant_request_id = models.CharField(max_length=100, unique=True)
    checkout_request_id = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    phone_number = models.CharField(max_length=15)
    status = models.CharField(max_length=20, default='PENDING')
    receipt_number = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mpesa {self.checkout_request_id} - {self.amount} ({self.status})"
