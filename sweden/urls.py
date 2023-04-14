from django.contrib import admin
from django.urls import path
from .views import CitiesListView, CitySingleView

urlpatterns = [
    path('', CitiesListView.as_view()),
    path('<int:pk>/', CitySingleView.as_view()),
    
]
