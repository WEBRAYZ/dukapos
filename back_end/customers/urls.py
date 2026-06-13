from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, CustomerGroupViewSet

router = DefaultRouter()
router.register(r'groups', CustomerGroupViewSet, basename='customer-group')
router.register(r'', CustomerViewSet, basename='customer')

urlpatterns = [
    path('', include(router.urls)),
]
