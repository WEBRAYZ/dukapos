from rest_framework import viewsets, permissions
from .models import PlatformConfig
from .serializers import PlatformConfigSerializer

class PlatformConfigViewSet(viewsets.ModelViewSet):
    queryset = PlatformConfig.objects.all()
    serializer_class = PlatformConfigSerializer
    permission_classes = [permissions.IsAdminUser]
