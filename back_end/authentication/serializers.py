from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import BusinessProfile, CustomRole

User = get_user_model()

class CustomRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomRole
        fields = '__all__'

class BusinessProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    custom_role_name = serializers.CharField(source='custom_role.name', read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 
            'role', 'custom_role', 'custom_role_name', 'is_tenant_admin',
            'branch_id', 'phone_number', 'is_active_session',
            'last_login_ip', 'is_superuser', 'is_staff', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'last_login_ip', 'created_at', 'updated_at')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'username', 'password', 'email', 'first_name', 'last_name', 
            'role', 'custom_role', 'is_tenant_admin', 'branch_id', 'phone_number'
        )

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
