"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/notifications/', include('notifications.urls')),
    path('api/auditlogs/', include('auditlogs.urls')),
    path('api/auth/', include('authentication.urls')),
    path('api/backups/', include('backups.urls')),
    path('api/pos/', include('pos.urls')),
    path('api/inventory/', include('inventory.urls')),
    path('api/products/', include('products.urls')),
    path('api/suppliers/', include('suppliers.urls')),
    path('api/purchases/', include('purchases.urls')),
    path('api/customers/', include('customers.urls')),
    path('api/finance/', include('finance.urls')),
    path('api/tenants/', include('tenants.urls')),
    path('api/shifts/', include('shifts.urls')),
    path('api/reports/', include('reports.urls')),
    path('api/returns/', include('returns.urls')),
    path('api/synchronization/', include('synchronization.urls')),
    path('api/devices/', include('devices.urls')),
    path('api/tax/', include('tax.urls')),
    path('api/chat/', include('chat.urls')),
    path('api/superadmin/monitoring/', include('monitoring.urls')),
    path('api/superadmin/subscriptions/', include('subscriptions.urls')),
    path('api/superadmin/branches/', include('branches.urls')),
    path('api/superadmin/security/', include('security.urls')),
    path('api/superadmin/settings/', include('superadmin_settings.urls')),
    path('api/superadmin/dashboard/', include('superadmin_dashboard.urls')),
    path('api/superadmin/reports/', include('global_reports.urls')),
    path('api/superadmin/users/', include('users.urls')),
    path('api/superadmin/tenants/', include('tenants.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
