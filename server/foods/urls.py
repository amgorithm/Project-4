from django.urls import path

from . import views

urlpatterns = [
  path('signup/', views.RegisterView.as_view()),
  path('login/', views.LoginView.as_view()),
  path("inventory/", views.Inventory.as_view(), name="inventory"),
  path("inventory-detail/<int:pk>/", views.InventoryDetail.as_view(), name="inventory_detail")
]
