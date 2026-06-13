from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SystemMetricViewSet, ServiceHealthViewSet, ErrorLogViewSet

router = DefaultRouter()
router.register(r'metrics', SystemMetricViewSet)
router.register(r'health', ServiceHealthViewSet)
router.register(r'errors', ErrorLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
