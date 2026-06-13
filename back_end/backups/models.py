from django.db import models
from django.conf import settings

class BackupScheduleLog(models.Model):
    triggered_by = models.CharField(max_length=100, default="SYSTEM")
    file_path_reference = models.CharField(max_length=255)
    executed_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="SUCCESS")

    def __str__(self):
        return f"Backup {self.status} at {self.executed_at}"

class Backup(models.Model):
    BACKUP_TYPES = [
        ("FULL", "Full Backup"),
        ("DATABASE", "Database"),
        ("MEDIA", "Media"),
        ("SETTINGS", "Settings"),
    ]

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PROCESSING", "Processing"),
        ("COMPLETED", "Completed"),
        ("FAILED", "Failed"),
        ("RESTORED", "Restored"),
    ]

    backup_name = models.CharField(max_length=255)
    backup_type = models.CharField(max_length=20, choices=BACKUP_TYPES)
    file = models.FileField(upload_to="backups/")
    file_size = models.BigIntegerField(null=True, blank=True, help_text="Size in bytes")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    restored_at = models.DateTimeField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.backup_name} ({self.get_backup_type_display()})"
