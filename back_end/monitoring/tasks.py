import psutil
from celery import shared_task
from .models import SystemMetric, ServiceHealth
from django.db import connections
from django.db.utils import OperationalError

@shared_task
def collect_system_metrics():
    # CPU Usage
    cpu = psutil.cpu_percent()
    SystemMetric.objects.create(metric_type='CPU', value=cpu)
    
    # Memory Usage
    memory = psutil.virtual_memory().percent
    SystemMetric.objects.create(metric_type='MEMORY', value=memory)
    
    # Disk Usage
    disk = psutil.disk_usage('/').percent
    SystemMetric.objects.create(metric_type='DISK', value=disk)

@shared_task
def check_services_health():
    # Check database connection
    db_conn = connections['default']
    try:
        db_conn.cursor()
        ServiceHealth.objects.update_or_create(
            service_name='Database',
            defaults={'status': 'healthy'}
        )
    except OperationalError:
        ServiceHealth.objects.update_or_create(
            service_name='Database',
            defaults={'status': 'down'}
        )
    
    # Check Redis/Cache
    from django.core.cache import cache
    try:
        cache.set('health_check', 'ok', timeout=5)
        if cache.get('health_check') == 'ok':
             ServiceHealth.objects.update_or_create(
                service_name='Redis',
                defaults={'status': 'healthy'}
            )
    except Exception:
        ServiceHealth.objects.update_or_create(
            service_name='Redis',
            defaults={'status': 'down'}
        )
