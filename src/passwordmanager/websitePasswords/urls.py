from django.urls import path
from .views import WebsitePasswordCreateView

urlpatterns = [
    path('create-website-password/', WebsitePasswordCreateView.as_view())
]