from django.contrib import admin
from .models import ReturnTransaction, ReturnItem

class ReturnItemInline(admin.TabularInline):
    model = ReturnItem
    extra = 0
    readonly_fields = ('sale_item', 'quantity_returned')

@admin.register(ReturnTransaction)
class ReturnTransactionAdmin(admin.ModelAdmin):
    list_display = ('sale', 'refund_amount', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('sale__sale_number', 'reason')
    inlines = [ReturnItemInline]
    readonly_fields = ('timestamp',)

admin.site.register(ReturnItem)
