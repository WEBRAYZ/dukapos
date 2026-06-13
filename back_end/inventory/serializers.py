from rest_framework import serializers
from .models import Branch, StockLevel, StockBatch, StockMovement

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'

class StockLevelSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = StockLevel
        fields = ['id', 'branch', 'branch_name', 'product', 'product_name', 'quantity', 'minimum_required']

class StockBatchSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = StockBatch
        fields = ['id', 'product', 'product_name', 'branch', 'branch_name', 'batch_number', 'expiry_date', 'quantity', 'created_at']

class StockMovementSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = StockMovement
        fields = '__all__'

class StockAdjustmentSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    branch = serializers.IntegerField()
    type = serializers.ChoiceField(choices=['Add Stock (+)', 'Subtract Stock (-)', 'Set New Level (=)'])
    quantity = serializers.DecimalField(max_digits=12, decimal_places=2)
    reason = serializers.CharField(max_length=255)
    reference = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True)
