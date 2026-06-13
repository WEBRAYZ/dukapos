from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'branch_id', 'is_staff', 'is_active_session')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active', 'branch_id')
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role', 'branch_id', 'phone_number', 'is_active_session', 'last_login_ip')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('role', 'branch_id', 'phone_number')}),
    )
    search_fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'branch_id')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at', 'last_login_ip')
