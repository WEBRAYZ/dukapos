from django.db import models
from django.conf import settings
from inventory.models import Branch

class CashierShift(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='shifts')
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT, related_name='shifts')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    opening_float = models.DecimalField(max_digits=12, decimal_places=2)
    expected_closing_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    actual_reported_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True) # Blind close
    
    status = models.CharField(
        max_length=20, 
        choices=[('OPEN', 'Open'), ('CLOSED', 'Closed')], 
        default='OPEN'
    )

    def __str__(self):
        return f"Shift {self.id} - {self.user.username} ({self.branch.name})"
