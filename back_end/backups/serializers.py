from rest_framework import serializers
from .models import Backup, BackupScheduleLog

class BackupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Backup
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

class BackupScheduleLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackupScheduleLog
        fields = '__all__'
        read_only_fields = ['id', 'executed_at']
