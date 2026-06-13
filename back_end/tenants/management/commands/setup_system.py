from django.core.management.base import BaseCommand
from tenants.models import Tenant, Domain
from django.conf import settings

class Command(BaseCommand):
    help = 'Initialize the multi-tenant system with a public tenant'

    def handle(self, *args, **options):
        # Create public tenant if it doesn't exist
        if not Tenant.objects.filter(schema_name='public').exists():
            self.stdout.write('Creating public tenant...')
            tenant = Tenant.objects.create(
                schema_name='public',
                company_name='Public Schema',
                is_active=True
            )
            Domain.objects.create(
                domain='localhost', # Change this for production
                tenant=tenant,
                is_primary=True
            )
            self.stdout.write(self.style.SUCCESS('Public tenant created successfully.'))
        else:
            self.stdout.write('Public tenant already exists.')
