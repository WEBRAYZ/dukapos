from rest_framework import serializers
from .models import DailyFinancialSnapshot

class DailyFinancialSnapshotSerializer(serializers.ModelSerializer):
    branch_name = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = DailyFinancialSnapshot
        fields = '__all__'
