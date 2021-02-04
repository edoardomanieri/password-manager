from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.urls import reverse
from django.http import JsonResponse
from rest_framework.generics import (
    CreateAPIView, 
    ListAPIView,
)
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework import generics, status


from .serializers import WebsitePasswordSerializer, CreateWebsitePasswordSerializer
from .models import WebsitePassword
from .encryption import decrypt


# Create your views here.
class WebsitePasswordCreateView(APIView):
    serializer_class = CreateWebsitePasswordSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = str(request.user)
            data = {k: v for k,v in serializer.data.items() if k != 'master_password'}
            websitePassword = WebsitePassword(user=user, **data)
            websitePassword.save()
            return Response(WebsitePasswordSerializer(websitePassword).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        

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

    


