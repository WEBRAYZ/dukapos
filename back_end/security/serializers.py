from rest_framework import serializers
from .models import SecurityAudit, BlockedIP

class SecurityAuditSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = SecurityAudit
        fields = '__all__'

class BlockedIPSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedIP
        fields = '__all__'
