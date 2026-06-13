from rest_framework import serializers
from .models import GlobalSnapshot, RegionalAnalytics

class GlobalSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalSnapshot
        fields = '__all__'

class RegionalAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionalAnalytics
        fields = '__all__'
