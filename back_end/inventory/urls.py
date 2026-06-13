from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BranchViewSet, StockLevelViewSet, StockBatchViewSet, StockMovementViewSet

router = DefaultRouter()
router.register(r'branches', BranchViewSet)
router.register(r'levels', StockLevelViewSet)
router.register(r'batches', StockBatchViewSet)
router.register(r'movements', StockMovementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
