from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaxBracketViewSet, ETIMSDeviceViewSet, ETIMSSaleTransmissionViewSet

router = DefaultRouter()
router.register(r'brackets', TaxBracketViewSet)
router.register(r'devices', ETIMSDeviceViewSet)
router.register(r'transmissions', ETIMSSaleTransmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
