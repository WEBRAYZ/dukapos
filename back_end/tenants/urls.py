from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, OnboardingView

router = DefaultRouter()
router.register(r'', TenantViewSet)

urlpatterns = [
    path('onboarding/', OnboardingView.as_view(), name='tenant_onboarding'),
    path('', include(router.urls)),
]
