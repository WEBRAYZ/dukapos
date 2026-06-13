from rest_framework import serializers
from .models import Customer, CustomerGroup

class CustomerGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerGroup
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id', 'name', 'customer_type', 'email', 'phone', 
            'address', 'kra_pin', 'store_credit_balance', 
            'group', 'group_name', 'loyalty_points', 'is_active', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
