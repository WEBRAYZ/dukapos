from django.contrib import admin
from .models import Branch, StockLevel, StockBatch

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'etims_branch_id')
    search_fields = ('name', 'location', 'etims_branch_id')

@admin.register(StockLevel)
class StockLevelAdmin(admin.ModelAdmin):
    list_display = ('product', 'branch', 'quantity', 'minimum_required')
    list_filter = ('branch', 'product')
    search_fields = ('product__name', 'branch__name')

@admin.register(StockBatch)
class StockBatchAdmin(admin.ModelAdmin):
    list_display = ('product', 'branch', 'batch_number', 'quantity', 'expiry_date')
    list_filter = ('branch', 'product', 'expiry_date')
    search_fields = ('product__name', 'batch_number')
