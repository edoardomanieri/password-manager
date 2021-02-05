from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.urls import reverse
from django.http import JsonResponse
from rest_framework.generics import (
    CreateAPIView, 
    ListAPIView,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .serializers import CreateWebsitePasswordSerializer, WebsitePasswordSerializer
from .models import WebsitePassword
from .encryption import decrypt


# Create your views here.
class WebsitePasswordCreateView(CreateAPIView):
    serializer_class = CreateWebsitePasswordSerializer
    queryset = WebsitePassword.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            websitePassword = serializer.save()
            return Response(WebsitePasswordSerializer(websitePassword).data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

    


