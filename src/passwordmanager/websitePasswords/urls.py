from django.urls import path
from django.contrib.auth.decorators import login_required

from .views import (
    WebsitePasswordCreateView, 
    WebsitePasswordDetailView, 
    WebsitePasswordListView
)

app_name = 'websitepasswords'
urlpatterns = [
    path('list/', WebsitePasswordListView.as_view(), name='websitepassword-list'),
    path('create/', login_required(WebsitePasswordCreateView.as_view()), name='websitepassword-create'),
    path('<int:id>/', WebsitePasswordDetailView.as_view(), name='websitepassword-detail')
]
