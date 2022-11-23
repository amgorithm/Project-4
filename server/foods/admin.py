from django.contrib import admin
from .models import Food, Category, FoodWasteFact
# Register your models here.

admin.site.register(Food)
admin.site.register(Category)
admin.site.register(FoodWasteFact)
