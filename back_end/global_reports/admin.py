from django.contrib import admin
from .models import GlobalSnapshot, RegionalAnalytics

@admin.register(GlobalSnapshot)
class GlobalSnapshotAdmin(admin.ModelAdmin):
    list_display = ('date', 'total_tenants', 'active_tenants', 'total_revenue', 'total_sales_count')
    readonly_fields = ('timestamp',)

@admin.register(RegionalAnalytics)
class RegionalAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('region', 'tenant_count', 'revenue_share', 'last_updated')
