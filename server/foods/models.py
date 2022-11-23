from django.db import models
from django.conf import settings
# Create your models here.

class Category(models.Model):
  name = models.CharField(max_length=50)

  def __str__(self):
    return f"{self.name}"


class Food(models.Model):
  name = models.CharField(max_length=50)
  category = models.ForeignKey(Category, related_name='category', on_delete=models.SET_NULL, null=True)
  quantity = models.IntegerField(default=1, blank=True, null=True)
  expiry_date = models.DateField()
  wasted = models.BooleanField(blank=True, null=True)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  created_at = models.DateField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)

  def __str__(self):
    return f"{self.name}"



class FoodWasteFact(models.Model):
  information = models.TextField(max_length=200)
  source_name = models.CharField(max_length=80)
  publication_date = models.DateField()

  def __str__(self):
    return f"{self.source_name}"