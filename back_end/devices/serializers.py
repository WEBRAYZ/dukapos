from rest_framework import serializers
from .models import PosDevice

class PosDeviceSerializer(serializers.ModelSerializer):
    branch_name = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = PosDevice
        fields = ['id', 'branch', 'branch_name', 'device_name', 'device_serial', 'etims_comm_key', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']
