from rest_framework import serializers
from .models import Category, Product, ProductVariant

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'created_at']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'name', 'barcode', 'selling_price', 'stock_quantity']

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'sku', 'barcode', 'category', 'category_name',
            'description', 'image', 'cost_price', 'selling_price',
            'tax_rate', 'stock_quantity', 'low_stock_threshold', 
            'status', 'item_code', 'unspsc_code', 'packaging_unit',
            'created_at', 'updated_at', 'variants'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
