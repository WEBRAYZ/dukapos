from django.db import connection
from django.core.exceptions import ValidationError

PLAN_LIMITS = {
    'starter': {
        'products': 1000,
        'users': 10,
    },
    'growth': {
        'products': 5000,
        'users': 20,
    },
    'pro': {
        'products': 50000,
        'users': 50,
    },
    'enterprise': {
        'products': 1000000,
        'users': 1000,
    },
    'FREE': {
        'products': 100,
        'users': 2,
    }
}

def check_limit(model_class, limit_type):
    """
    Checks if the current tenant has reached their limit for a specific resource.
    """
    tenant = connection.tenant
    plan = getattr(tenant, 'plan', 'starter')
    
    # Ensure plan is normalized to lowercase for lookup, except 'FREE'
    plan_key = plan if plan == 'FREE' else plan.lower()
    limits = PLAN_LIMITS.get(plan_key, PLAN_LIMITS['starter'])
    
    limit = limits.get(limit_type)
    if limit is None:
        return # No limit defined
        
    current_count = model_class.objects.count()
    if current_count >= limit:
        raise ValidationError(
            f"Limit reached for your '{plan}' plan ({limit} {limit_type}). "
            f"Please upgrade your subscription to add more."
        )
