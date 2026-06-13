from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import TaxBracket, ETIMSDevice, ETIMSSaleTransmission
from .serializers import (
    TaxBracketSerializer, ETIMSDeviceSerializer, 
    ETIMSSaleTransmissionSerializer
)
from .etims_service import ETIMSService
from pos.models import Sale
from django.shortcuts import get_object_or_404

class TaxBracketViewSet(viewsets.ModelViewSet):
    queryset = TaxBracket.objects.all()
    serializer_class = TaxBracketSerializer
    permission_classes = [permissions.IsAuthenticated]

class ETIMSDeviceViewSet(viewsets.ModelViewSet):
    queryset = ETIMSDevice.objects.all()
    serializer_class = ETIMSDeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

class ETIMSSaleTransmissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ETIMSSaleTransmission.objects.all()
    serializer_class = ETIMSSaleTransmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='transmit-sale/(?P<sale_id>[^/.]+)')
    def transmit_sale(self, request, sale_id=None):
        sale = get_object_or_404(Sale, id=sale_id)
        device = ETIMSDevice.objects.filter(is_active=True).first()
        
        if not device:
            return Response(
                {"error": "No active eTIMS device found for this tenant."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        service = ETIMSService(device)
        transmission = service.transmit_sale(sale)
        
        return Response(
            ETIMSSaleTransmissionSerializer(transmission).data,
            status=status.HTTP_200_OK if transmission.transmission_status == 'SENT' else status.HTTP_400_BAD_REQUEST
        )
