from rest_framework import serializers
from .models import Payment, MPesaTransaction, ExpenseCategory, Expense

class MPesaTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPesaTransaction
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    mpesa_details = MPesaTransactionSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'sale', 'amount', 'method', 'status', 'transaction_id', 'created_at', 'mpesa_details']

class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = Expense
        fields = ['id', 'branch', 'branch_name', 'category', 'category_name', 'amount', 'description', 'date', 'created_at']
