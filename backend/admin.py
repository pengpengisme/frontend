from django.contrib import admin
from backend import models

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'brand', 'age', 'size', 'likes')

admin.site.register(models.Member)
admin.site.register(models.Product, ProductAdmin)
# Register your models here.
