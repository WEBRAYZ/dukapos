from rest_framework import serializers
from .models import OfflineSyncQueue

class OfflineSyncQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineSyncQueue
        fields = '__all__'
        read_only_fields = ['id', 'synced_at']
