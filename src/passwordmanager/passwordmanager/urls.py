from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('accounts.urls')),
    path('websitepasswords/', include('websitePasswords.urls')),
    path('', include('frontend.urls')),
    path('login/token-auth/', obtain_jwt_token)
]
