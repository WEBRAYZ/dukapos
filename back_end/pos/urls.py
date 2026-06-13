from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SaleViewSet, CartViewSet, CartItemViewSet, ReceiptViewSet

router = DefaultRouter()
router.register(r'sales', SaleViewSet, basename='sale')
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')
router.register(r'receipts', ReceiptViewSet, basename='receipt')

urlpatterns = [
    path('', include(router.urls)),
]
