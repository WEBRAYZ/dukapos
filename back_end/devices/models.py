from django.db import models
from inventory.models import Branch

class PosDevice(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT, related_name='devices')
    device_name = models.CharField(max_length=100)
    device_serial = models.CharField(max_length=100, unique=True) # e.g., "OSCU-NDUKA-001"
    etims_comm_key = models.TextField(help_text="Unique API validation string issued by KRA")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device_name} ({self.device_serial})"
