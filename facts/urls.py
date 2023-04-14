from django.contrib import admin
from django.urls import path
from .views import FactsListView, FactSingleView

urlpatterns = [
    path('', FactsListView.as_view()),
    path('<int:pk>/', FactSingleView.as_view()),
    
]
