from rest_framework import viewsets, permissions
from .models import OfflineSyncQueue
from .serializers import OfflineSyncQueueSerializer

class OfflineSyncQueueViewSet(viewsets.ModelViewSet):
    queryset = OfflineSyncQueue.objects.all()
    serializer_class = OfflineSyncQueueSerializer
    permission_classes = [permissions.IsAuthenticated]
