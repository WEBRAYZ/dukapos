import requests
import json
import logging
import os
from django.conf import settings
from django.utils import timezone
from .models import ETIMSDevice, ETIMSSaleTransmission
from authentication.models import BusinessProfile

logger = logging.getLogger(__name__)

class ETIMSService:
    """
    Centralized service for interacting with the KRA eTIMS API.
    Handles authentication per tenant and data formatting.
    """
    BASE_URL = os.getenv('ETIMS_BASE_URL', 'https://etims-api-test.kra.go.ke/v1')

    def __init__(self, device: ETIMSDevice):
        self.device = device
        self.business = BusinessProfile.objects.first()
        self.headers = {
            'Content-Type': 'application/json',
            'apiKey': self.device.device_key,
            'kraPin': self.business.kra_pin if self.business else ''
        }

    def transmit_sale(self, sale):
        """
        Formats sale data into the KRA JSON structure and transmits it.
        """
        transmission, _ = ETIMSSaleTransmission.objects.get_or_create(sale=sale)
        
        # Example KRA Payload structure
        payload = {
            "tin": self.business.kra_pin,
            "bhfId": self.device.branch_code,
            "invcNo": transmission.id, # Internal seq
            "orgInvcNo": 0,
            "custTin": sale.customer.kra_pin if hasattr(sale.customer, 'kra_pin') else "",
            "custNm": sale.customer.name if sale.customer else "Cash Sale",
            "salesTyCd": "N", # Normal
            "rcptTyCd": "S", # Sale
            "pmtTyCd": "01", # Cash (maps to your finance methods)
            "totItmCnt": sale.items.count(),
            "totTaxblAmt": float(sale.total_amount),
            "totTaxAmt": float(sale.tax_amount),
            "totAmt": float(sale.total_amount + sale.tax_amount),
            "itemList": [
                {
                    "itemCd": item.product.item_code or "ITEM-001",
                    "itemNm": item.product.name,
                    "pkgUnitCd": item.product.packaging_unit or "PCS",
                    "qty": float(item.quantity),
                    "prc": float(item.unit_price),
                    "totAmt": float(item.total_price)
                } for item in sale.items.all()
            ]
        }

        try:
            response = requests.post(
                f"{self.BASE_URL}/sales/saveSales",
                headers=self.headers,
                data=json.dumps(payload),
                timeout=30
            )
            
            res_data = response.json()
            transmission.raw_response = res_data
            
            if response.status_code == 200 and res_data.get('resultCd') == '000':
                transmission.transmission_status = 'SENT'
                transmission.kra_invoice_number = res_data.get('data', {}).get('rcptNo')
                transmission.kra_qr_code = res_data.get('data', {}).get('qrCode')
                transmission.sent_at = timezone.now()
            else:
                transmission.transmission_status = 'FAILED'
                transmission.error_message = res_data.get('resultMsg', 'Unknown KRA error')
                
            transmission.save()
            return transmission

        except Exception as e:
            logger.error(f"ETIMS Transmission failed: {str(e)}")
            transmission.transmission_status = 'FAILED'
            transmission.error_message = str(e)
            transmission.save()
            return transmission
