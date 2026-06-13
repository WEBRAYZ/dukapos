from django.contrib import admin
from .models import PurchaseOrder, PurchaseOrderItem

class PurchaseOrderItemInline(admin.TabularInline):
    model = PurchaseOrderItem
    extra = 1
    readonly_fields = ('subtotal',)

@admin.register(PurchaseOrder)
class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ('purchase_number', 'supplier', 'branch', 'grand_total', 'status', 'order_date')
    list_filter = ('status', 'supplier', 'branch', 'order_date')
    search_fields = ('purchase_number', 'supplier__company_name')
    inlines = [PurchaseOrderItemInline]
    readonly_fields = ('purchase_number', 'created_by', 'order_date')

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
