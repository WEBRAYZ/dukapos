from celery import shared_task
from .models import TenantSubscription
from django.utils import timezone

@shared_task
def check_subscriptions_expiry():
    today = timezone.now().date()
    expired_subs = TenantSubscription.objects.filter(end_date__lt=today, is_active=True)
    for sub in expired_subs:
        sub.is_active = False
        sub.save()
        # Future: Send notification to tenant owner
