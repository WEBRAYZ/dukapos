from django.contrib import admin
from django_tenants.admin import TenantAdminMixin
from .models import Tenant, Domain

@admin.register(Tenant)
class CustomTenantAdmin(TenantAdminMixin, admin.ModelAdmin):
    list_display = ('company_name', 'schema_name', 'plan', 'is_active', 'created_on')
    list_filter = ('plan', 'is_active', 'created_on')
    search_fields = ('company_name', 'schema_name')

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ('domain', 'tenant', 'is_primary')
    search_fields = ('domain',)
