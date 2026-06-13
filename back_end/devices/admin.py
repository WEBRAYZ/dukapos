from django.contrib import admin
from .models import PosDevice

@admin.register(PosDevice)
class PosDeviceAdmin(admin.ModelAdmin):
    list_display = ('device_name', 'device_serial', 'branch', 'is_active', 'created_at')
    list_filter = ('branch', 'is_active', 'created_at')
    search_fields = ('device_name', 'device_serial', 'branch__name')
    readonly_fields = ('created_at',)
