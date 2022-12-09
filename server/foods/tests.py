from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Food, Category
# Create your tests here.

class FoodTests(TestCase):
  @classmethod
  def setUpTestData(cls):
    cls.user = get_user_model().objects.create_user(
      username="Clementine",
      email="clementine@email.com",
      password="supersecretpw"
    )

    cls.category = Category.objects.create(
      name="dairy"
    )

    cls.food = Food.objects.create(
      name="Yoghurt",
      category=cls.category,
      expiry_date="2022-11-15",
      user = cls.user,
    )
  

  
  def test_category_model(self):
    self.assertEqual(self.category.name, "dairy")

  def test_food_model(self):
    self.assertEqual(self.food.name, "Yoghurt")
    self.assertEqual(self.food.category.name, "dairy")
    self.assertEqual(self.food.expiry_date, "2022-11-15")
    self.assertEqual(self.food.user.username, "Clementine")



  def test_user_model(self):

    self.assertEqual(self.user.username, "Clementine")
    self.assertEqual(self.user.email, "clementine@email.com")
    
