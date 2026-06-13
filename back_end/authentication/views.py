from rest_framework import generics, status, permissions, viewsets, filters
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.conf import settings
from django.db.models import Q
from .models import BusinessProfile, CustomRole
from .serializers import (
    UserSerializer, RegisterSerializer, 
    BusinessProfileSerializer, CustomRoleSerializer
)
from auditlogs.models import AuditLog

User = get_user_model()

class CustomRoleViewSet(viewsets.ModelViewSet):
    queryset = CustomRole.objects.all()
    serializer_class = CustomRoleSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'email', 'phone_number', 'first_name', 'last_name']
    ordering_fields = ['username', 'created_at']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        self.user.is_active_session = True
        self.user.save()
        return data

class BusinessProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = BusinessProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        profile, created = BusinessProfile.objects.get_or_create(id=1)
        return profile

    def perform_update(self, serializer):
        profile = serializer.save()
        AuditLog.log_request(
            request=self.request,
            action="UPDATE",
            entity_type="BusinessProfile",
            entity_id=str(profile.id),
            description=f"User {self.request.user.username} updated business profile",
            severity="INFO"
        )

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            username_or_email = request.data.get('username')
            user = User.objects.filter(
                Q(username=username_or_email) | 
                Q(email=username_or_email) | 
                Q(phone_number=username_or_email)
            ).first()
            
            if user:
                user.last_login_ip = request.META.get('REMOTE_ADDR')
                user.save()
                
                try:
                    AuditLog.log_request(
                        request=request,
                        action="LOGIN",
                        entity_type="User",
                        entity_id=str(user.id),
                        description=f"User {user.username} logged in successfully",
                        severity="INFO"
                    )
                except Exception as e:
                    print(f"Login audit log failed: {e}")
        return response

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        AuditLog.log_request(
            request=self.request,
            action="CREATE",
            entity_type="User",
            entity_id=str(user.id),
            description=f"Admin created new user: {user.username} with role {user.role}",
            severity="INFO"
        )

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user
        
    def perform_update(self, serializer):
        user = serializer.save()
        AuditLog.log_request(
            request=self.request,
            action="UPDATE",
            entity_type="User",
            entity_id=str(user.id),
            description=f"User {user.username} updated their profile",
            severity="INFO"
        )

class LogoutView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user = request.user
        user.is_active_session = False
        user.save()
        
        AuditLog.log_request(
            request=request,
            action="LOGOUT",
            entity_type="User",
            entity_id=str(user.id),
            description=f"User {user.username} logged out",
            severity="INFO"
        )
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
