from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from rest_framework import generics, permissions
from .serializers import UserSerializer, InventorySerializer
from .permissions import IsAuthor
from .models import Food, Category
from django.utils import timezone
from datetime import timedelta, datetime
from django.db.models import Q, F
User = get_user_model()


# Create your views here.

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
              user = serializer.save()
              token = jwt.encode(
                {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
              return Response({'message': 'Registration successful', 'token': token})
        return Response(serializer.errors, status=422)



class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})


class Inventory(generics.ListCreateAPIView):
  def get_queryset(self):
      user = self.request.user
      # Get user created foods that are yet to expire 
      return Food.objects.filter(user_id=user.id).filter(expiry_date__gte=timezone.now())
  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)
  

class InventoryDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Food.objects.all()
  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)


class ExpiringRed(generics.ListAPIView):
  def get_queryset(self):
    user = self.request.user
 
    return Food.objects.filter(user_id=user.id).filter(expiry_date=timezone.now())

  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)


class ExpiringOrange(generics.ListAPIView):
  def get_queryset(self):
    user = self.request.user
    day_today = timezone.now()

    one = day_today + timedelta(days=1)
    two = day_today + timedelta(days=2)
    three = day_today + timedelta(days=3)
    one_to_three = Food.objects.filter(user_id=user.id).filter(Q(expiry_date=one) | Q(expiry_date=two) | Q(expiry_date=three))
    return one_to_three
    # green = Food.objects.filter(user_id=user.id).filter(Q(expiry_date=six) | Q(expiry_date=seven))
    # orange = Food.objects.filter(user_id=user.id).filter(Q(expiry_date=four) | Q(expiry_date=five))
    # green_orange = green | orange 
    # return green_orange
  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)


class ExpiringYellow(generics.ListAPIView):
  def get_queryset(self):
    user = self.request.user
    day_today = timezone.now()

    four = day_today + timedelta(days=4)
    five = day_today + timedelta(days=5)
    four_five = Food.objects.filter(user_id=user.id).filter(Q(expiry_date=four) | Q(expiry_date=five))
    return four_five 

  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)

class ExpiringGreen(generics.ListAPIView):
  def get_queryset(self):
      user = self.request.user
      day_today = timezone.now()

      six = day_today + timedelta(days=6)
      seven = day_today + timedelta(days=7)
      six_seven = Food.objects.filter(user_id=user.id).filter(Q(expiry_date=six) | Q(expiry_date=seven))
      return six_seven

  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)