from django.contrib import admin
from .models import Payment, MPesaTransaction, ExpenseCategory, Expense

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('sale', 'amount', 'method', 'status', 'created_at')
    list_filter = ('method', 'status', 'created_at')
    search_fields = ('sale__sale_number', 'transaction_id')

@admin.register(MPesaTransaction)
class MPesaTransactionAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'amount', 'checkout_request_id', 'is_processed', 'created_at')
    list_filter = ('is_processed', 'created_at')
    search_fields = ('phone_number', 'merchant_request_id', 'checkout_request_id')
    readonly_fields = ('created_at',)

@admin.register(ExpenseCategory)
class ExpenseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('description', 'category', 'amount', 'date', 'branch')
    list_filter = ('category', 'date', 'branch')
    search_fields = ('description', 'reference_no')
