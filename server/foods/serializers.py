from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from .models import Food, Category
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})
        # Commented out for testing purposes
        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('name', 'username', 'email', 'password', 'password_confirmation',)


class UserCreatedSerializer(serializers.ModelSerializer):
  class Meta:
    model = get_user_model()
    fields = ("id", "username")

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ("id", "name")


class InventorySerializer(serializers.ModelSerializer):
  user = UserCreatedSerializer()
  category = CategorySerializer()
  
  class Meta:
    model = Food
    fields = ("id", "name", "category", "quantity", "expiry_date", "wasted", "user", "created_at", "updated_at")

    def create(self, validated_data):

      category_data = validated_data.pop("category")
      user_data = validated_data.pop("user")

      (category, _) = Category.objects.get_or_create(**category_data)
      (user, _) = get_user_model().objects.get(**user_data)

      food = Food.objects.create(**validated_data, category=category, user=user)
      return food


    def update(self, food, validated_data):
         
          category_data = validated_data.pop("category")
          category = food.category
          category.name = category_data.get("name", category.name)
          food.name = validated_data.get("name", food.name)
          food.quantity = validated_data.get("quantity", food.quantity)
          food.expiry_date = validated_data.get("expiry_date", food.expiry_date)
          food.wasted = validated_data.get("wasted", food.wasted)

          category.save()
          food.save()
          return food



