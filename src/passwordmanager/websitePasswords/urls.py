from django.urls import path
from .views import WebsitePasswordCreateView

urlpatterns = [
    path('create', WebsitePasswordCreateView.as_view())
]