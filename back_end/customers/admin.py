from django.contrib import admin
from .models import Customer, CustomerGroup

@admin.register(CustomerGroup)
class CustomerGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'customer_type', 'group', 'loyalty_points', 'is_active')
    list_filter = ('customer_type', 'group', 'is_active', 'created_at')
    search_fields = ('name', 'email', 'phone', 'kra_pin')
    readonly_fields = ('created_at', 'updated_at')
