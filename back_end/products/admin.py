from django.contrib import admin
from .models import Category, Product, ProductVariant

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'created_at')
    search_fields = ('name',)
    list_filter = ('parent',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'category', 'selling_price', 'stock_quantity', 'status')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('name', 'sku', 'barcode', 'description')
    inlines = [ProductVariantInline]
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'sku', 'barcode', 'category', 'description', 'image', 'status')
        }),
        ('Pricing & Tax', {
            'fields': ('cost_price', 'selling_price', 'tax_rate')
        }),
        ('Inventory Management', {
            'fields': ('stock_quantity', 'low_stock_threshold')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'name', 'barcode', 'selling_price', 'stock_quantity')
    search_fields = ('name', 'barcode', 'product__name')
