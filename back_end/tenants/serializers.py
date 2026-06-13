from rest_framework import serializers
from .models import Tenant, Domain
from django_tenants.utils import tenant_context
from django.contrib.auth import get_user_model
from authentication.models import BusinessProfile
import string
import random

User = get_user_model()

class TenantSerializer(serializers.ModelSerializer):
    domain = serializers.CharField(write_only=True)

    class Meta:
        model = Tenant
        fields = ['id', 'schema_name', 'company_name', 'domain', 'plan', 'created_on']

    def create(self, validated_data):
        domain_name = validated_data.pop('domain')
        tenant = Tenant.objects.create(**validated_data)
        
        # Create the domain for the tenant
        Domain.objects.create(
            domain=domain_name,
            tenant=tenant,
            is_primary=True
        )
        
        return tenant

class OnboardingSerializer(serializers.Serializer):
    # Business Info
    company_name = serializers.CharField(max_length=100)
    domain_prefix = serializers.CharField(max_length=50) # e.g. "mybusiness"
    business_type = serializers.CharField(max_length=100, required=False)
    location = serializers.CharField(max_length=100, required=False)
    kra_pin = serializers.CharField(max_length=20, required=False)
    
    # User Info
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    phone_number = serializers.CharField(max_length=20, required=False)
    
    # Plan Info
    plan = serializers.CharField(max_length=50, required=False, default='starter')
    billing_cycle = serializers.CharField(max_length=20, required=False, default='monthly')

    def create(self, validated_data):
        company_name = validated_data['company_name']
        domain_prefix = validated_data['domain_prefix']
        selected_plan = validated_data.get('plan', 'starter')
        billing_cycle = validated_data.get('billing_cycle', 'monthly')
        
        # Generate schema name from domain prefix
        schema_name = domain_prefix.lower().replace('-', '_')
        
        # Ensure schema name is unique (simple way for now)
        if Tenant.objects.filter(schema_name=schema_name).exists():
            schema_name = f"{schema_name}_{''.join(random.choices(string.ascii_lowercase + string.digits, k=4))}"

        # 1. Create Tenant
        tenant = Tenant.objects.create(
            schema_name=schema_name,
            company_name=company_name,
            plan=selected_plan
        )

        # 2. Create Domain
        # In dev, we use .localhost
        domain_name = f"{domain_prefix}.localhost" 
        Domain.objects.create(
            domain=domain_name,
            tenant=tenant,
            is_primary=True
        )

        # 3. Create User and Business Profile in the tenant schema
        with tenant_context(tenant):
            user = User.objects.create_user(
                username=validated_data['email'],
                email=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                phone_number=validated_data.get('phone_number', ''),
                is_tenant_admin=True,
                role='ADMIN'
            )

            # Create the Business Profile
            BusinessProfile.objects.create(
                business_name=company_name,
                business_type=validated_data.get('business_type', ''),
                county=validated_data.get('location', ''),
                phone=validated_data.get('phone_number', ''),
                email=validated_data.get('email', ''),
                kra_pin=validated_data.get('kra_pin', ''),
                selected_plan=selected_plan,
                billing_cycle=billing_cycle
            )

        return {
            "tenant": tenant,
            "user": user,
            "domain": domain_name
        }

    def to_representation(self, instance):
        return {
            "status": "success",
            "message": "Tenant and Admin User created successfully",
            "tenant_id": instance['tenant'].id,
            "schema_name": instance['tenant'].schema_name,
            "domain": instance['domain'],
            "user_email": instance['user'].email
        }
