from django.contrib import admin
from .models import Backup

@admin.register(Backup)
class BackupAdmin(admin.ModelAdmin):
    list_display = ('backup_name', 'backup_type', 'status', 'file_size', 'created_by', 'created_at', 'restored_at')
    list_filter = ('backup_type', 'status', 'created_at')
    search_fields = ('backup_name', 'description', 'created_by__username')
    readonly_fields = ('file_size', 'created_at', 'restored_at', 'created_by')
    ordering = ('-created_at',)
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
