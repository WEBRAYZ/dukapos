from django.db import models

class GlobalSnapshot(models.Model):
    date = models.DateField(unique=True)
    total_tenants = models.IntegerField(default=0)
    active_tenants = models.IntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    total_sales_count = models.IntegerField(default=0)
    active_users_24h = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Global Snapshot"
        verbose_name_plural = "Global Snapshots"
        ordering = ['-date']

    def __str__(self):
        return f"Snapshot for {self.date}"

class RegionalAnalytics(models.Model):
    region = models.CharField(max_length=100, unique=True)
    tenant_count = models.IntegerField(default=0)
    revenue_share = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Regional Analytic"
        verbose_name_plural = "Regional Analytics"

    def __str__(self):
        return self.region
