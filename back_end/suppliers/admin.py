from django.contrib import admin
from .models import Supplier

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_person', 'phone', 'email')
    list_filter = ('created_at',)
    search_fields = ('company_name', 'contact_person', 'phone', 'email', 'kra_pin')
    readonly_fields = ('created_at', 'updated_at')
