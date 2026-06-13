from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from monitoring.models import SystemMetric, ServiceHealth
from subscriptions.models import TenantSubscription
from global_reports.models import GlobalSnapshot
from tenants.models import Tenant
from authentication.models import User
from django.db.models import Sum

class SuperAdminSummaryView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        total_tenants = Tenant.objects.count()
        active_users = User.objects.filter(is_active=True).count()
        
        cpu_usage = SystemMetric.objects.filter(metric_type='CPU').first()
        
        latest_snapshot = GlobalSnapshot.objects.order_by('-date').first()
        revenue_mtd = latest_snapshot.total_revenue if latest_snapshot else 0
        
        # Dynamic service health
        services = ServiceHealth.objects.all()
        cluster_health = []
        for service in services:
            cluster_health.append({
                'name': service.service_name,
                'status': service.status.capitalize(),
                'load': f"{service.response_time or 0}ms"
            })

        return Response({
            'totalTenants': str(total_tenants),
            'activeUsers': f"{active_users:,}",
            'systemLoad': f"{cpu_usage.value if cpu_usage else 0:.0f}%",
            'revenueMtd': f"KSh {revenue_mtd/1000000:.1f}M" if revenue_mtd >= 1000000 else f"KSh {revenue_mtd:,.0f}",
            'clusterHealth': cluster_health if cluster_health else [
                { 'name': 'Identity Provider', 'status': 'Healthy', 'load': '12%' },
                { 'name': 'Transaction Engine', 'status': 'Healthy', 'load': '42%' },
            ]
        })
