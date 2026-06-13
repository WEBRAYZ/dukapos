from rest_framework import serializers
from .models import PurchaseOrder, PurchaseOrderItem

class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = PurchaseOrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'unit_cost', 'subtotal']
        read_only_fields = ['subtotal']

class PurchaseOrderSerializer(serializers.ModelSerializer):
    items_list = PurchaseOrderItemSerializer(source='items', many=True, read_only=True)
    supplier_name = serializers.CharField(source='supplier.company_name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    item_count = serializers.IntegerField(source='items.count', read_only=True)

    class Meta:
        model = PurchaseOrder
        fields = [
            'id', 'purchase_number', 'supplier', 'supplier_name', 'branch', 
            'branch_name', 'order_date', 'expected_delivery_date', 'status', 
            'grand_total', 'item_count', 'items_list', 'notes'
        ]
        read_only_fields = ['id', 'purchase_number', 'order_date']
