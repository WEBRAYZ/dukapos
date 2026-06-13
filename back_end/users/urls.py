from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SuperAdminUserViewSet

router = DefaultRouter()
router.register(r'', SuperAdminUserViewSet, basename='superadmin-user')

urlpatterns = [
    path('', include(router.urls)),
]
