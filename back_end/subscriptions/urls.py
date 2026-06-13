from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubscriptionTierViewSet, TenantSubscriptionViewSet, MpesaTransactionViewSet

router = DefaultRouter()
router.register(r'tiers', SubscriptionTierViewSet)
router.register(r'tenant-subscriptions', TenantSubscriptionViewSet)
router.register(r'mpesa-transactions', MpesaTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
