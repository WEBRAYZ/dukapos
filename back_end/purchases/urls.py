from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PurchaseOrderViewSet, PurchaseOrderItemViewSet

router = DefaultRouter()
router.register(r'orders', PurchaseOrderViewSet)
router.register(r'items', PurchaseOrderItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
