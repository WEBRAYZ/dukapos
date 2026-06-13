from rest_framework import serializers
from .models import TaxBracket, ETIMSDevice, ETIMSSaleTransmission

class TaxBracketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxBracket
        fields = '__all__'

class ETIMSDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETIMSDevice
        fields = '__all__'

class ETIMSSaleTransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETIMSSaleTransmission
        fields = '__all__'
