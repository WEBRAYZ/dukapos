from django.db import models
from django_tenants.models import TenantMixin, DomainMixin

class Tenant(TenantMixin):
    company_name = models.CharField(max_length=100)
    created_on = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    # Optional: store plan or subscription info
    plan = models.CharField(max_length=50, default='FREE')
    
    # True = schema is automatically created on save
    auto_create_schema = True
    # True = schema is deleted when tenant is deleted
    auto_drop_schema = True

    def __str__(self):
        return self.company_name

class Domain(DomainMixin):
    pass
