from rest_framework import viewsets, permissions
from .models import SubscriptionTier, TenantSubscription, MpesaTransaction
from .serializers import SubscriptionTierSerializer, TenantSubscriptionSerializer, MpesaTransactionSerializer

class SubscriptionTierViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionTier.objects.all()
    serializer_class = SubscriptionTierSerializer
    permission_classes = [permissions.IsAdminUser]

class TenantSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = TenantSubscription.objects.all()
    serializer_class = TenantSubscriptionSerializer
    permission_classes = [permissions.IsAdminUser]

class MpesaTransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MpesaTransaction.objects.all()
    serializer_class = MpesaTransactionSerializer
    permission_classes = [permissions.IsAdminUser]
