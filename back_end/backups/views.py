from rest_framework import viewsets, permissions
from .models import Backup, BackupScheduleLog
from .serializers import BackupSerializer, BackupScheduleLogSerializer

class BackupViewSet(viewsets.ModelViewSet):
    queryset = Backup.objects.all()
    serializer_class = BackupSerializer
    permission_classes = [permissions.IsAdminUser]

class BackupScheduleLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BackupScheduleLog.objects.all()
    serializer_class = BackupScheduleLogSerializer
    permission_classes = [permissions.IsAdminUser]
