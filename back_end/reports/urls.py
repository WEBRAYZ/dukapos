from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DailyFinancialSnapshotViewSet, DashboardSummaryView

router = DefaultRouter()
router.register(r'financial-snapshots', DailyFinancialSnapshotViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-summary/', DashboardSummaryView.as_view(), name='dashboard-summary'),
]
