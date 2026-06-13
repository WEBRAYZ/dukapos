from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet, SystemAlertViewSet

router = DefaultRouter()
router.register(r'user', NotificationViewSet)
router.register(r'alerts', SystemAlertViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
