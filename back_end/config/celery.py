import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('ndukapos')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'collect-metrics-every-5-minutes': {
        'task': 'monitoring.tasks.collect_system_metrics',
        'schedule': 300.0,
    },
    'check-service-health-every-minute': {
        'task': 'monitoring.tasks.check_services_health',
        'schedule': 60.0,
    },
    'generate-daily-snapshot-at-midnight': {
        'task': 'global_reports.tasks.generate_global_daily_snapshot',
        'schedule': crontab(hour=0, minute=0),
    },
    'check-subscriptions-daily': {
        'task': 'subscriptions.tasks.check_subscriptions_expiry',
        'schedule': crontab(hour=1, minute=0),
    },
}

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
