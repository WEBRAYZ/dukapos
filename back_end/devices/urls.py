from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PosDeviceViewSet

router = DefaultRouter()
router.register(r'', PosDeviceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
