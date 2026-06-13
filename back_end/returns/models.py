from django.db import models
from pos.models import Sale, SaleItem

class ReturnTransaction(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('PROCESSING', 'Processing'),
        ('COMPLETED', 'Completed'),
        ('REJECTED', 'Rejected'),
    ]

    sale = models.ForeignKey(Sale, on_delete=models.PROTECT, related_name='returns')
    reason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    refund_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"Return {self.id} for Sale {self.sale.sale_number} - {self.refund_amount}"

class ReturnItem(models.Model):
    return_transaction = models.ForeignKey(ReturnTransaction, on_delete=models.CASCADE, related_name='items')
    sale_item = models.ForeignKey(SaleItem, on_delete=models.PROTECT)
    quantity_returned = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.quantity_returned} of {self.sale_item.product.name} (Return {self.return_transaction.id})"
