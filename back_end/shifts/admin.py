from django.contrib import admin
from .models import CashierShift

@admin.register(CashierShift)
class CashierShiftAdmin(admin.ModelAdmin):
    list_display = ('user', 'branch', 'status', 'start_time', 'end_time', 'opening_float', 'actual_reported_amount')
    list_filter = ('status', 'branch', 'start_time')
    search_fields = ('user__username', 'branch__name')
    readonly_fields = ('start_time', 'end_time')
