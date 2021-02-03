from django.urls import path

from .views import (
    WebsitePasswordCreateView, 
    get_decrypted_password
)

app_name = 'websitepasswords'
urlpatterns = [
    path('create/', WebsitePasswordCreateView.as_view()),
    path('<int:id>/ajax/get_decrypted_password/', get_decrypted_password, name='get_decrypted_password')
]
