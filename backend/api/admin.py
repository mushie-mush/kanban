from django.contrib import admin

from .models import Card, Column, Board

admin.site.register(Board)
admin.site.register(Column)
admin.site.register(Card)