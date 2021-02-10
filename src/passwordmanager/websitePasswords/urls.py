from django.urls import path
from .views import WebsitePasswordCreateView, GetDecryptedPasswordView, WebsitePasswordUpdateView

urlpatterns = [
    path('create-website-password/', WebsitePasswordCreateView.as_view()),
    path('list/', WebsitePasswordCreateView.as_view()),
    path('get-password/',  GetDecryptedPasswordView.as_view()),
    path('update-website-password/<int:pk>', WebsitePasswordUpdateView.as_view())
]