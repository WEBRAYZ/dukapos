from rest_framework import viewsets, permissions
from .models import GlobalSnapshot, RegionalAnalytics
from .serializers import GlobalSnapshotSerializer, RegionalAnalyticsSerializer

class GlobalSnapshotViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GlobalSnapshot.objects.all()
    serializer_class = GlobalSnapshotSerializer
    permission_classes = [permissions.IsAdminUser]

class RegionalAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RegionalAnalytics.objects.all()
    serializer_class = RegionalAnalyticsSerializer
    permission_classes = [permissions.IsAdminUser]
