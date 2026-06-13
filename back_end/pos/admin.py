from django.contrib import admin
from .models import Sale, SaleItem, Receipt, Cart, CartItem

class SaleItemInline(admin.TabularInline):
    model = SaleItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'unit_price', 'tax_amount', 'subtotal')

class ReceiptInline(admin.StackedInline):
    model = Receipt
    can_delete = False
    readonly_fields = ('receipt_number', 'printed', 'created_at')

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('sale_number', 'branch', 'cashier', 'total_amount', 'status', 'timestamp')
    list_filter = ('status', 'timestamp', 'cashier', 'branch')
    search_fields = ('sale_number', 'cashier__username')
    inlines = [SaleItemInline, ReceiptInline]
    readonly_fields = ('sale_number', 'branch', 'cashier', 'shift', 'customer', 'timestamp', 'subtotal', 'tax_amount', 'total_amount', 'payment_mode')

admin.site.register(Cart)
admin.site.register(CartItem)
