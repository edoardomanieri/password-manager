from django.urls import path
from .views import WebsitePasswordCreateView, GetDecryptedPasswordView, WebsitePasswordUpdateView, WebsitePasswordDeleteView

urlpatterns = [
    path('create-website-password/', WebsitePasswordCreateView.as_view()),
    path('list/', WebsitePasswordCreateView.as_view()),
    path('get-password/',  GetDecryptedPasswordView.as_view()),
    path('update-website-password/<int:pk>', WebsitePasswordUpdateView.as_view()),
    path('delete-website-password/<int:pk>', WebsitePasswordDeleteView.as_view())
]