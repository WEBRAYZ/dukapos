import requests
import base64
from datetime import datetime
import json
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class MPesaService:
    def __init__(self):
        self.consumer_key = getattr(settings, 'MPESA_CONSUMER_KEY', '')
        self.consumer_secret = getattr(settings, 'MPESA_CONSUMER_SECRET', '')
        self.shortcode = getattr(settings, 'MPESA_SHORTCODE', '174379')
        self.passkey = getattr(settings, 'MPESA_PASSKEY', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919')
        self.env = getattr(settings, 'MPESA_ENV', 'sandbox')
        
        if self.env == 'sandbox':
            self.base_url = 'https://sandbox.safaricom.co.ke'
        else:
            self.base_url = 'https://api.safaricom.co.ke'

    def get_access_token(self):
        url = f"{self.base_url}/oauth/v1/generate?grant_type=client_credentials"
        try:
            auth_str = f"{self.consumer_key}:{self.consumer_secret}"
            encoded_auth = base64.b64encode(auth_str.encode()).decode()
            
            headers = {
                'Authorization': f'Basic {encoded_auth}'
            }
            
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json().get('access_token')
        except Exception as e:
            logger.error(f"Failed to get M-Pesa access token: {str(e)}")
            return None

    def stk_push(self, phone_number, amount, callback_url, account_reference, transaction_desc):
        access_token = self.get_access_token()
        if not access_token:
            return None, "Authentication failed"

        url = f"{self.base_url}/mpesa/stkpush/v1/processrequest"
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password_str = f"{self.shortcode}{self.passkey}{timestamp}"
        password = base64.b64encode(password_str.encode()).decode()

        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        # Format phone number (e.g., 254712345678)
        if phone_number.startswith('0'):
            phone_number = '254' + phone_number[1:]
        elif phone_number.startswith('+'):
            phone_number = phone_number[1:]

        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount),
            "PartyA": phone_number,
            "PartyB": self.shortcode,
            "PhoneNumber": phone_number,
            "CallBackURL": callback_url,
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc
        }

        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            return response.json(), None
        except Exception as e:
            logger.error(f"M-Pesa STK Push failed: {str(e)}")
            return None, str(e)
