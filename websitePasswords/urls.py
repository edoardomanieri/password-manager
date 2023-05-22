from django.urls import path

from .views import (
    DecryptedPasswordRetrieveView,
    WebsitePasswordListCreateView,
    WebsitePasswordView,
)

urlpatterns = [
    path("get-decrypted-password/", DecryptedPasswordRetrieveView.as_view()),
    path("", WebsitePasswordListCreateView.as_view()),
    path("<int:pk>", WebsitePasswordView.as_view()),
]
