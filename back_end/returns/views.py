from rest_framework import viewsets, permissions
from .models import ReturnTransaction, ReturnItem
from .serializers import ReturnTransactionSerializer, ReturnItemSerializer

class ReturnTransactionViewSet(viewsets.ModelViewSet):
    queryset = ReturnTransaction.objects.all()
    serializer_class = ReturnTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

class ReturnItemViewSet(viewsets.ModelViewSet):
    queryset = ReturnItem.objects.all()
    serializer_class = ReturnItemSerializer
    permission_classes = [permissions.IsAuthenticated]
