from rest_framework import serializers
from .models import Sale, SaleItem, Receipt, Cart, CartItem

class SaleItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = SaleItem
        fields = [
            'id', 'product', 'product_name', 'quantity', 
            'unit_price', 'tax_amount', 'subtotal'
        ]

class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['id', 'receipt_number', 'printed', 'created_at']

class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True)
    receipt = ReceiptSerializer(read_only=True)
    cashier_name = serializers.CharField(source='cashier.username', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    
    class Meta:
        model = Sale
        fields = [
            'id', 'sale_number', 'branch', 'branch_name', 'shift', 
            'cashier', 'cashier_name', 'customer', 'timestamp', 
            'subtotal', 'tax_amount', 'total_amount', 'payment_mode', 
            'status', 'mpesa_checkout_id', 'mpesa_receipt', 
            'kra_invoice_signature', 'kra_qr_string', 'items', 'receipt'
        ]
        read_only_fields = ['id', 'sale_number', 'timestamp', 'cashier']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        sale = Sale.objects.create(**validated_data)
        for item_data in items_data:
            SaleItem.objects.create(sale=sale, **item_data)
        return sale

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'cashier', 'created_at', 'items']
