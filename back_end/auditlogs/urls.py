from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuditLogViewSet, SystemAuditLogViewSet

router = DefaultRouter()
router.register(r'events', AuditLogViewSet)
router.register(r'system', SystemAuditLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
