from django.urls import path

from . import views

urlpatterns = [
  path('signup/', views.RegisterView.as_view()),
  path('login/', views.LoginView.as_view()),
  path("inventory/", views.Inventory.as_view(), name="inventory"),
  path("inventory-detail/<int:pk>/", views.InventoryDetail.as_view(), name="inventory_detail"),
  path("inventory/expiring-this-week/red/", views.ExpiringRed.as_view(), name="expiring_this_week_red"),
  path("inventory/expiring-this-week/orange/", views.ExpiringOrange.as_view(), name="expiring_this_week_orange"),
  path("inventory/expiring-this-week/yellow/", views.ExpiringYellow.as_view(), name="expiring_this_week_yellow"),
  path("inventory/expiring-this-week/green/", views.ExpiringGreen.as_view(), name="expiring_this_week_green"),

]
