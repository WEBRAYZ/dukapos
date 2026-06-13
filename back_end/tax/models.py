from django.db import models
from pos.models import Sale

class TaxBracket(models.Model):
    TAX_CODES = [
        ('A', '16% VAT'),
        ('B', '0%'),
        ('C', 'Exempt'),
        ('D', 'Non-VAT'),
        ('E', '8% VAT'),
    ]
    code = models.CharField(max_length=2, choices=TAX_CODES, unique=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Bracket {self.code} ({self.percentage}%)"

class ETIMSDevice(models.Model):
    """
    Stores eTIMS technical details for the tenant.
    Each shop has its own device registered with KRA.
    """
    device_id = models.CharField(max_length=100, help_text="Device ID or Serial Number")
    device_key = models.CharField(max_length=255, help_text="eTIMS API Key/Token")
    branch_code = models.CharField(max_length=10, default="00")
    is_active = models.BooleanField(default=True)
    last_sync_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Device {self.device_id} (Branch {self.branch_code})"

class ETIMSSaleTransmission(models.Model):
    """
    Tracking log for every sale sent to KRA.
    """
    sale = models.OneToOneField(Sale, on_delete=models.CASCADE, related_name='etims_transmission')
    internal_data_invoice_no = models.CharField(max_length=100)
    kra_qr_code = models.TextField(null=True, blank=True)
    kra_invoice_number = models.CharField(max_length=100, null=True, blank=True)
    transmission_status = models.CharField(
        max_length=20, 
        choices=[('PENDING', 'Pending'), ('SENT', 'Sent'), ('FAILED', 'Failed')],
        default='PENDING'
    )
    error_message = models.TextField(null=True, blank=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    raw_response = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"eTIMS {self.sale.sale_number} - {self.transmission_status}"
