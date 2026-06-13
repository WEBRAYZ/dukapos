from django.contrib import admin
from .models import SystemMetric, ServiceHealth, ErrorLog

@admin.register(SystemMetric)
class SystemMetricAdmin(admin.ModelAdmin):
    list_display = ('metric_type', 'value', 'timestamp')
    list_filter = ('metric_type',)

@admin.register(ServiceHealth)
class ServiceHealthAdmin(admin.ModelAdmin):
    list_display = ('service_name', 'status', 'last_check', 'response_time')
    list_filter = ('status',)

@admin.register(ErrorLog)
class ErrorLogAdmin(admin.ModelAdmin):
    list_display = ('level', 'message', 'created_at')
    list_filter = ('level',)
    readonly_fields = ('created_at',)
