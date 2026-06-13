from django.contrib import admin
from .models import SubscriptionTier, TenantSubscription, MpesaTransaction

@admin.register(SubscriptionTier)
class SubscriptionTierAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'max_branches', 'max_users', 'is_active')

@admin.register(TenantSubscription)
class TenantSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'tier', 'end_date', 'is_active')
    list_filter = ('tier', 'is_active')

@admin.register(MpesaTransaction)
class MpesaTransactionAdmin(admin.ModelAdmin):
    list_display = ('checkout_request_id', 'amount', 'phone_number', 'status', 'created_at')
    list_filter = ('status',)
    readonly_fields = ('created_at',)
