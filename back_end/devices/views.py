from rest_framework import viewsets, permissions
from .models import PosDevice
from .serializers import PosDeviceSerializer

class PosDeviceViewSet(viewsets.ModelViewSet):
    queryset = PosDevice.objects.all()
    serializer_class = PosDeviceSerializer
    permission_classes = [permissions.IsAuthenticated]
