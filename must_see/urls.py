from django.contrib import admin
from django.urls import path
from .views import MustSeeListView, MustSingleView

urlpatterns = [
    path('', MustSeeListView.as_view()),
    path('<int:pk>/', MustSingleView.as_view()),
]
