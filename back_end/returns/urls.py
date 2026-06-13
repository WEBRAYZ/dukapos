from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReturnTransactionViewSet, ReturnItemViewSet

router = DefaultRouter()
router.register(r'transactions', ReturnTransactionViewSet)
router.register(r'items', ReturnItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
