from rest_framework import serializers
from .models import Notification, SystemAlert

class SystemAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemAlert
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
