from rest_framework import serializers
from .models import SystemMetric, ServiceHealth, ErrorLog

class SystemMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemMetric
        fields = '__all__'

class ServiceHealthSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceHealth
        fields = '__all__'

class ErrorLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ErrorLog
        fields = '__all__'
