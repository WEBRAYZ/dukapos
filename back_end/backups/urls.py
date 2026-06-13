from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BackupViewSet, BackupScheduleLogViewSet

router = DefaultRouter()
router.register(r'files', BackupViewSet)
router.register(r'logs', BackupScheduleLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
