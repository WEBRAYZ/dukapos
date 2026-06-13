from django.contrib import admin
from .models import AuditLog, SystemAuditLog

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "action",
        "severity",
        "entity_type",
        "branch_id",
        "created_at",
    )

    search_fields = (
        "description",
        "entity_type",
        "entity_id",
        "user__username",
    )

    list_filter = (
        "action",
        "severity",
        "entity_type",
        "created_at",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "user",
        "action",
        "severity",
        "entity_type",
        "entity_id",
        "description",
        "old_value",
        "new_value",
        "ip_address",
        "user_agent",
        "mac_address",
        "device_id",
        "branch_id",
        "created_at",
    )

    date_hierarchy = "created_at"
    list_per_page = 50

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(SystemAuditLog)
class SystemAuditLogAdmin(admin.ModelAdmin):
    list_display = ('action', 'user', 'ip_address', 'timestamp')
    list_filter = ('action', 'timestamp')
    search_fields = ('action', 'details', 'user__username')
    readonly_fields = ('timestamp',)

    def has_add_permission(self, request):
        return False
