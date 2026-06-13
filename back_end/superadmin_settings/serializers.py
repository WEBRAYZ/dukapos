from rest_framework import serializers
from .models import PlatformConfig

class PlatformConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformConfig
        fields = '__all__'
