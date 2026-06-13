from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OfflineSyncQueueViewSet

router = DefaultRouter()
router.register(r'queue', OfflineSyncQueueViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
