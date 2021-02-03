from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.urls import reverse
from django.http import JsonResponse
from rest_framework.generics import (
    CreateAPIView, 
    ListAPIView
)

from .serializers import WebsitePasswordSerializer
from .models import WebsitePassword
from .encryption import decrypt


# Create your views here.
class WebsitePasswordCreateView(CreateAPIView):
    serializer_class = WebsitePasswordSerializer
    queryset = WebsitePassword.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["user"] = self.request.user
        return context


## ajax function view
def get_decrypted_password(request, *args, **kwargs):
    master_password = request.POST['master_password']
    is_password_wrong = not request.user.check_password(master_password)
    id_ = kwargs.get("id")
    encrypted_password = get_object_or_404(WebsitePassword, id=id_).password
    plain_password = "" if is_password_wrong else decrypt(encrypted_password, master_password)
    data = {
        'is_password_wrong': is_password_wrong,
        'plain_password': plain_password
    }
    return JsonResponse(data)

    


