from django.db import models

class OfflineSyncQueue(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    ]

    offline_client_uuid = models.UUIDField()
    module_type = models.CharField(max_length=50) # e.g., "POS_SALE", "STOCK_ADJUSTMENT"
    payload = models.JSONField() # Holds raw cached transaction until network resolution
    captured_at = models.DateTimeField()
    synced_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"{self.module_type} - {self.offline_client_uuid} ({self.status})"
