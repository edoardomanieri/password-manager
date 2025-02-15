from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    path("accounts/", include("accounts.urls")),
    path("websitepasswords/", include("website_passwords.urls")),
    path("", include("frontend.urls")),
    path("login/token-auth/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/token-refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
