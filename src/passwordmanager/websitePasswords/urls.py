from django.urls import path
from django.contrib.auth.decorators import login_required

from .views import WebsitePasswordCreateView


app_name = 'websitepasswords'
urlpatterns = [
    path('create/', login_required(WebsitePasswordCreateView.as_view()), name='websitePassword-create')
]
