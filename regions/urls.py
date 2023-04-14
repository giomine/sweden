from django.contrib import admin
from django.urls import path
from .views import RegionsListView, RegionSingleView

urlpatterns = [
    path('', RegionsListView.as_view()),
    path('<int:pk>/', RegionSingleView.as_view()),
]
