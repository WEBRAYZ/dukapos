from django.contrib import admin
from .models import SecurityAudit, BlockedIP

@admin.register(SecurityAudit)
class SecurityAuditAdmin(admin.ModelAdmin):
    list_display = ('event_type', 'user', 'ip_address', 'timestamp')
    list_filter = ('event_type',)
    readonly_fields = ('timestamp',)

@admin.register(BlockedIP)
class BlockedIPAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'blocked_at', 'expires_at')
    search_fields = ('ip_address',)
