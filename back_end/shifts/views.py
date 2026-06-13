from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import CashierShift
from .serializers import CashierShiftSerializer
from auditlogs.models import AuditLog

class CashierShiftViewSet(viewsets.ModelViewSet):
    queryset = CashierShift.objects.all()
    serializer_class = CashierShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        shift = serializer.save(user=self.request.user, status='OPEN')
        AuditLog.log_request(
            request=self.request,
            action="CREATE",
            entity_type="CashierShift",
            entity_id=str(shift.id),
            description=f"Cashier {self.request.user.username} started a new shift",
            severity="INFO"
        )

    @action(detail=True, methods=['post'])
    def close_shift(self, request, pk=None):
        shift = self.get_object()
        shift.status = 'CLOSED'
        shift.end_time = timezone.now()
        shift.actual_reported_amount = request.data.get('actual_amount')
        shift.save()
        
        AuditLog.log_request(
            request=request,
            action="UPDATE",
            entity_type="CashierShift",
            entity_id=str(shift.id),
            description=f"Cashier {request.user.username} closed shift",
            severity="INFO"
        )
        return Response({'status': 'shift closed'})
