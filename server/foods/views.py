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
      print('user', user)
      return Food.objects.filter(user_id=user.id)
  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)
  



class InventoryDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Food.objects.all()
  serializer_class = InventorySerializer
  permission_classes = (IsAuthor | permissions.IsAdminUser,)