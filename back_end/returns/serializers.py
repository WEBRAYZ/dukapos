from rest_framework import serializers
from .models import ReturnTransaction, ReturnItem

class ReturnItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='sale_item.product.name', read_only=True)

    class Meta:
        model = ReturnItem
        fields = ['id', 'sale_item', 'product_name', 'quantity_returned']

class ReturnTransactionSerializer(serializers.ModelSerializer):
    items_list = ReturnItemSerializer(source='items', many=True, read_only=True)
    sale_number = serializers.CharField(source='sale.sale_number', read_only=True)
    customer_name = serializers.SerializerMethodField()
    first_item_name = serializers.SerializerMethodField()
    item_count = serializers.IntegerField(source='items.count', read_only=True)

    class Meta:
        model = ReturnTransaction
        fields = [
            'id', 'sale', 'sale_number', 'customer_name', 'first_item_name', 
            'item_count', 'reason', 'timestamp', 'refund_amount', 'status', 'items_list'
        ]
        read_only_fields = ['id', 'timestamp']

    def get_customer_name(self, obj):
        if obj.sale.customer:
            return obj.sale.customer.name
        return "Walk-in Customer"

    def get_first_item_name(self, obj):
        first_item = obj.items.first()
        if first_item:
            return first_item.sale_item.product.name
        return "N/A"
