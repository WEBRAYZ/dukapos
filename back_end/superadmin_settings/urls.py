from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlatformConfigViewSet

router = DefaultRouter()
router.register(r'configs', PlatformConfigViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
