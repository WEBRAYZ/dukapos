from rest_framework import viewsets, permissions
from .models import SystemMetric, ServiceHealth, ErrorLog
from .serializers import SystemMetricSerializer, ServiceHealthSerializer, ErrorLogSerializer

class SystemMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SystemMetric.objects.all()
    serializer_class = SystemMetricSerializer
    permission_classes = [permissions.IsAdminUser]

class ServiceHealthViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceHealth.objects.all()
    serializer_class = ServiceHealthSerializer
    permission_classes = [permissions.IsAdminUser]

class ErrorLogViewSet(viewsets.ModelViewSet):
    queryset = ErrorLog.objects.all()
    serializer_class = ErrorLogSerializer
    permission_classes = [permissions.IsAdminUser]
