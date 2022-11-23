from django.urls import path

from . import views

urlpatterns = [
  path('signup/', views.RegisterView.as_view()),
  path('login/', views.LoginView.as_view()),
  path('food-waste-facts/', views.FoodWasteFactList.as_view(), name="food-waste-facts"),
  path('food-waste-facts/add/', views.FoodWasteFactAdd.as_view(), name="food-waste-facts-add"),
  path('food-waste-facts/<int:pk>/', views.FoodWasteFactDetail.as_view(), name="food-waste-facts"),
  path("inventory/", views.Inventory.as_view(), name="inventory"),
  path("inventory-detail/<int:pk>/", views.InventoryDetail.as_view(), name="inventory_detail"),
  path("inventory/waste-unactioned-list/", views.WasteUnactionedList.as_view(), name="waste_unactioned_list"),
  path("inventory/waste-unactioned-detail/<int:pk>/", views.WasteUnactionedDetail.as_view(), name="waste_unactioned_detail"),
  path("inventory/expiring-this-week/red/", views.ExpiringRed.as_view(), name="expiring_this_week_red"),
  path("inventory/expiring-this-week/orange/", views.ExpiringOrange.as_view(), name="expiring_this_week_orange"),
  path("inventory/expiring-this-week/yellow/", views.ExpiringYellow.as_view(), name="expiring_this_week_yellow"),
  path("inventory/expiring-this-week/green/", views.ExpiringGreen.as_view(), name="expiring_this_week_green"),
  path('inventory/overall-consumed/', views.OverallConsumed.as_view(), name="overall_consumed"),
  path('inventory/overall-wasted/', views.OverallWasted.as_view(), name="overall_wasted"),
  path('inventory/last-three-months/consumed/', views.ThreeMonthConsumed.as_view(), name="last_three_month_consumed"),
  path('inventory/last-three-months/wasted/', views.ThreeMonthWasted.as_view(), name="last_three_month_wasted"),
  path('inventory/this-year/consumed/', views.ThisYearConsumed.as_view(), name="this_year_consumed"),
  path('inventory/this-year/wasted/', views.ThisYearWasted.as_view(), name="this_year_wasted"),
  path('inventory-search/<str:pk>/', views.InventorySearch.as_view(), name="inventory_search")
]

