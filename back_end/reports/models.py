from django.db import models
from inventory.models import Branch

class DailyFinancialSnapshot(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='financial_snapshots')
    date = models.DateField()
    total_sales_volume = models.DecimalField(max_digits=14, decimal_places=2)
    cost_of_goods_sold = models.DecimalField(max_digits=14, decimal_places=2)
    gross_margin = models.DecimalField(max_digits=14, decimal_places=2)
    total_tax_collected = models.DecimalField(max_digits=14, decimal_places=2)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('branch', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"Snapshot {self.branch.name} - {self.date}"
