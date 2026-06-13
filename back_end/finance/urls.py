from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PaymentViewSet, ExpenseCategoryViewSet, ExpenseViewSet,
    InitiateSTKPushView, MPesaCallbackView, PaymentStatusView,
    FinancialSummaryView
)

router = DefaultRouter()
router.register(r'payments', PaymentViewSet)
router.register(r'expense-categories', ExpenseCategoryViewSet)
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('summary/', FinancialSummaryView.as_view(), name='financial_summary'),
    path('mpesa/stkpush/', InitiateSTKPushView.as_view(), name='mpesa_stk_push'),
    path('mpesa/callback/', MPesaCallbackView.as_view(), name='mpesa_callback'),
    path('mpesa/status/<str:checkout_request_id>/', PaymentStatusView.as_view(), name='mpesa_status'),
]
