from rest_framework import serializers
from .models import CashierShift

class CashierShiftSerializer(serializers.ModelSerializer):
    cashier_name = serializers.CharField(source='user.username', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = CashierShift
        fields = [
            'id', 'user', 'cashier_name', 'branch', 'branch_name',
            'status', 'start_time', 'end_time', 'opening_float',
            'expected_closing_amount', 'actual_reported_amount'
        ]
        read_only_fields = ['id', 'start_time', 'end_time', 'status']
