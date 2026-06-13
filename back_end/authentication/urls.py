from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    LoginView, RegisterView, UserProfileView, 
    LogoutView, BusinessProfileView, CustomRoleViewSet, UserViewSet
)

router = DefaultRouter()
router.register(r'roles', CustomRoleViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('profile/', UserProfileView.as_view(), name='auth_profile'),
    path('business-profile/', BusinessProfileView.as_view(), name='business_profile'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]
