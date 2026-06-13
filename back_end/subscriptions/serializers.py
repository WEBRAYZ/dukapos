from rest_framework import serializers
from .models import SubscriptionTier, TenantSubscription, MpesaTransaction

class SubscriptionTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionTier
        fields = '__all__'

class TenantSubscriptionSerializer(serializers.ModelSerializer):
    tier_name = serializers.CharField(source='tier.name', read_only=True)
    tenant_name = serializers.CharField(source='tenant.company_name', read_only=True)
    
    class Meta:
        model = TenantSubscription
        fields = '__all__'

class MpesaTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaTransaction
        fields = '__all__'
