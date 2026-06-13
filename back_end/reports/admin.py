from django.contrib import admin
from .models import DailyFinancialSnapshot

@admin.register(DailyFinancialSnapshot)
class DailyFinancialSnapshotAdmin(admin.ModelAdmin):
    list_display = ('branch', 'date', 'total_sales_volume', 'gross_margin')
    list_filter = ('branch', 'date')
    readonly_fields = ('created_at',)
