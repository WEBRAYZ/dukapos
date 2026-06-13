from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CashierShiftViewSet

router = DefaultRouter()
router.register(r'', CashierShiftViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
