from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SecurityAuditViewSet, BlockedIPViewSet

router = DefaultRouter()
router.register(r'audit', SecurityAuditViewSet)
router.register(r'blocked-ips', BlockedIPViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
