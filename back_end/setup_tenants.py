import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from tenants.models import Tenant, Domain

# Create public tenant if it doesn't exist
if not Tenant.objects.filter(schema_name='public').exists():
    tenant = Tenant(schema_name='public', company_name='Public Tenant')
    tenant.save()
    domain = Domain()
    domain.domain = 'localhost'
    domain.tenant = tenant
    domain.is_primary = True
    domain.save()
    print("Public tenant created.")
else:
    print("Public tenant already exists.")

# Create a test tenant
if not Tenant.objects.filter(schema_name='test').exists():
    tenant = Tenant(schema_name='test', company_name='Test Shop')
    tenant.save()
    domain = Domain()
    domain.domain = 'test.localhost'
    domain.tenant = tenant
    domain.is_primary = True
    domain.save()
    print("Test tenant created.")
else:
    print("Test tenant already exists.")
