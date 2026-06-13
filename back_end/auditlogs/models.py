from django.db import models
from django.conf import settings

class SystemAuditLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name="system_audit_logs"
    )
    action = models.CharField(max_length=255) # e.g., "VOID_INVOICE", "BULK_CSV_EXPORT"
    ip_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField()

    class Meta:
        ordering = ["-timestamp"]
        verbose_name = "System Audit Log"

    def __str__(self):
        return f"{self.action} by {self.user.username if self.user else 'System'} at {self.timestamp}"

# Keep the original AuditLog as well if it's being used by other apps for granular tracking
class AuditLog(models.Model):
    ACTION_CHOICES = [
        ("CREATE", "Create"), ("UPDATE", "Update"), ("DELETE", "Delete"),
        ("LOGIN", "Login"), ("LOGOUT", "Logout"), ("SALE", "Sale"),
        ("REFUND", "Refund"), ("STOCK_CHANGE", "Stock Change"),
        ("PRICE_CHANGE", "Price Change"),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    severity = models.CharField(max_length=20, default="INFO")
    entity_type = models.CharField(max_length=100)
    entity_id = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField()
    
    old_value = models.JSONField(null=True, blank=True)
    new_value = models.JSONField(null=True, blank=True)
    
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    mac_address = models.CharField(max_length=50, null=True, blank=True)
    device_id = models.CharField(max_length=100, null=True, blank=True)
    branch_id = models.CharField(max_length=100, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def log_request(cls, request, action, entity_type, description, severity="INFO", **kwargs):
        user = request.user if request and hasattr(request, 'user') and request.user.is_authenticated else None
        ip_address = request.META.get('REMOTE_ADDR') if request else None
        return cls.objects.create(
            user=user, action=action, entity_type=entity_type, 
            description=description, severity=severity, ip_address=ip_address, **kwargs
        )
