from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GlobalSnapshotViewSet, RegionalAnalyticsViewSet

router = DefaultRouter()
router.register(r'snapshots', GlobalSnapshotViewSet)
router.register(r'regional-analytics', RegionalAnalyticsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
