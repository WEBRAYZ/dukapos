from django.urls import path
from .views import SuperAdminSummaryView

urlpatterns = [
    path('summary/', SuperAdminSummaryView.as_view(), name='superadmin-summary'),
]
