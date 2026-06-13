from django.db import models

class SystemMetric(models.Model):
    METRIC_TYPES = [
        ('CPU', 'CPU Usage'),
        ('MEMORY', 'Memory Usage'),
        ('DISK', 'Disk Usage'),
    ]
    metric_type = models.CharField(max_length=50, choices=METRIC_TYPES)
    value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = "System Metric"
        verbose_name_plural = "System Metrics"

    def __str__(self):
        return f"{self.metric_type}: {self.value}% at {self.timestamp}"

class ServiceHealth(models.Model):
    service_name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='healthy')
    last_check = models.DateTimeField(auto_now=True)
    response_time = models.FloatField(null=True, blank=True)  # in milliseconds

    class Meta:
        verbose_name = "Service Health"
        verbose_name_plural = "Service Health Statuses"

    def __str__(self):
        return f"{self.service_name} - {self.status}"

class ErrorLog(models.Model):
    level = models.CharField(max_length=20, default='ERROR')
    message = models.TextField()
    stack_trace = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "System Error Log"
        verbose_name_plural = "System Error Logs"

    def __str__(self):
        return f"{self.level}: {self.message[:50]}..."
