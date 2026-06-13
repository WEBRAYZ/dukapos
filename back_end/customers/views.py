from rest_framework import viewsets, permissions, filters
from .models import Customer, CustomerGroup
from .serializers import CustomerSerializer, CustomerGroupSerializer
from auditlogs.models import AuditLog

class CustomerGroupViewSet(viewsets.ModelViewSet):
    queryset = CustomerGroup.objects.all()
    serializer_class = CustomerGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'phone', 'kra_pin']
    ordering_fields = ['name', 'loyalty_points', 'created_at']

    def perform_create(self, serializer):
        customer = serializer.save()
        AuditLog.log_request(
            request=self.request,
            action="CREATE",
            entity_type="Customer",
            entity_id=str(customer.id),
            description=f"New customer added: {customer.name}",
            severity="INFO"
        )

    def perform_update(self, serializer):
        customer = serializer.save()
        AuditLog.log_request(
            request=self.request,
            action="UPDATE",
            entity_type="Customer",
            entity_id=str(customer.id),
            description=f"Customer information updated: {customer.name}",
            severity="INFO"
        )
        
    def perform_destroy(self, instance):
        AuditLog.log_request(
            request=self.request,
            action="DELETE",
            entity_type="Customer",
            entity_id=str(instance.id),
            description=f"Customer removed from system: {instance.name}",
            severity="WARNING"
        )
        super().perform_destroy(instance)
