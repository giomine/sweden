from django.contrib import admin
from django.urls import path
from .views import AttractionsListView, AttractionSingleView

urlpatterns = [
    path('', AttractionsListView.as_view()),
    path('<int:pk>/', AttractionSingleView.as_view()),
]
