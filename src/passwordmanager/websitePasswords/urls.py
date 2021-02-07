from django.urls import path
from .views import WebsitePasswordCreateView, GetDecryptedPasswordView

urlpatterns = [
    path('create-website-password/', WebsitePasswordCreateView.as_view()),
    path('list/', WebsitePasswordCreateView.as_view()),
    path('get-password/',  GetDecryptedPasswordView.as_view())
]