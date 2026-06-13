from celery import shared_task
from django_tenants.utils import tenant_context
from tenants.models import Tenant
from .models import GlobalSnapshot, RegionalAnalytics
from pos.models import Sale
from authentication.models import User
from django.utils import timezone
from django.db.models import Sum, Count
from decimal import Decimal

@shared_task
def generate_global_daily_snapshot():
    today = timezone.now().date()
    total_revenue = Decimal('0.00')
    total_sales_count = 0
    active_tenants = 0
    
    tenants = Tenant.objects.exclude(schema_name='public')
    for tenant in tenants:
        with tenant_context(tenant):
            # Aggregate data from this tenant's schema
            stats = Sale.objects.filter(created_at__date=today).aggregate(
                revenue=Sum('total_amount'),
                count=Count('id')
            )
            if stats['count'] and stats['count'] > 0:
                active_tenants += 1
                total_revenue += stats['revenue'] or Decimal('0.00')
                total_sales_count += stats['count']
                
    GlobalSnapshot.objects.update_or_create(
        date=today,
        defaults={
            'total_tenants': tenants.count(),
            'active_tenants': active_tenants,
            'total_revenue': total_revenue,
            'total_sales_count': total_sales_count,
            'active_users_24h': User.objects.filter(last_login__date=today).count()
        }
    )
