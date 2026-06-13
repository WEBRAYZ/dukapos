from rest_framework import viewsets, permissions
from .models import SecurityAudit, BlockedIP
from .serializers import SecurityAuditSerializer, BlockedIPSerializer

class SecurityAuditViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SecurityAudit.objects.all()
    serializer_class = SecurityAuditSerializer
    permission_classes = [permissions.IsAdminUser]

class BlockedIPViewSet(viewsets.ModelViewSet):
    queryset = BlockedIP.objects.all()
    serializer_class = BlockedIPSerializer
    permission_classes = [permissions.IsAdminUser]
