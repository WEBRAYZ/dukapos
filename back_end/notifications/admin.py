from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'notification_type', 'category', 'user', 'is_read', 'created_at')
    list_filter = ('notification_type', 'category', 'is_read', 'created_at')
    search_fields = ('title', 'message', 'user__username')
    ordering = ('-created_at',)
