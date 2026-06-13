from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from .models import Tenant
from .serializers import TenantSerializer, OnboardingSerializer

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

class OnboardingView(generics.CreateAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            return Response(serializer.to_representation(result), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
