from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from .models import Food, Category, FoodWasteFact
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError(
                {'password_confirmation': 'Passwords do not match'})       
        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('name', 'username', 'email',
                  'password', 'password_confirmation',)


class UserCreatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class InventorySerializer(serializers.ModelSerializer):
    user = UserCreatedSerializer()
    category = CategorySerializer()

    def create(self, validated_data):
        discarded_user = validated_data.pop("user")
  
        category_data = validated_data.pop("category")
        (category, _) = Category.objects.get_or_create(**category_data)
        user = self.context['request'].user
        food = Food.objects.create(**validated_data,  user=user, category=category)
        return food

    def update(self, food, validated_data):
        category_data = validated_data.pop("category")

        if category_data.get("name"):
  
            new_category = Category.objects.get(**category_data)
            food.category = new_category

        food.name = validated_data.get("name", food.name)
        food.quantity = validated_data.get("quantity", food.quantity)
        food.expiry_date = validated_data.get("expiry_date", food.expiry_date)
        food.wasted = validated_data.get("wasted", food.wasted)

        food.save()
        return food

    class Meta:
        model = Food
        fields = ("id", "name", "category", "quantity", "expiry_date", "wasted", "user", "created_at", "updated_at")


class FoodWasteFactSerializer(serializers.ModelSerializer):
  class Meta:
    model = FoodWasteFact
    fields = ("id", "information", "source_name", "publication_date")