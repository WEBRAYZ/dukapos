from django.db import models

class PlatformConfig(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()
    description = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Platform Configuration"
        verbose_name_plural = "Platform Configurations"

    def __str__(self):
        return self.key
