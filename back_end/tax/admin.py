from django.contrib import admin
from .models import TaxBracket

@admin.register(TaxBracket)
class TaxBracketAdmin(admin.ModelAdmin):
    list_display = ('code', 'percentage')
    search_fields = ('code',)
