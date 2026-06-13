from django.db import models
from django.conf import settings

class SystemAlert(models.Model):
    alert_type = models.CharField(max_length=50) # "LOW_STOCK", "EXPIRY_WARNING"
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.alert_type}: {self.message[:50]}..."

class Notification(models.Model):
    TYPE_CHOICES = [
        ("INFO", "Info"),
        ("WARNING", "Warning"),
        ("ERROR", "Error"),
        ("SUCCESS", "Success"),
    ]

    CATEGORY_CHOICES = [
        ("STOCK", "Stock"),
        ("PAYMENT", "Payment"),
        ("SYNC", "Synchronization"),
        ("SALE", "Sale"),
        ("DEVICE", "Device"),
        ("ETIMS", "eTIMS"),
        ("SYSTEM", "System"),
    ]

    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="INFO")
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="notifications"
    )
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.category})"
