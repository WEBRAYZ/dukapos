from rest_framework import viewsets, permissions
from .models import AuditLog, SystemAuditLog
from .serializers import AuditLogSerializer, SystemAuditLogSerializer

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAdminUser]

class SystemAuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SystemAuditLog.objects.all()
    serializer_class = SystemAuditLogSerializer
    permission_classes = [permissions.IsAdminUser]
