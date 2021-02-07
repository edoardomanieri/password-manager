from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    CreateAPIView, ListCreateAPIView,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .serializers import CreateWebsitePasswordSerializer, WebsitePasswordSerializer, MasterPasswordSerializer
from .models import WebsitePassword
from .encryption import decrypt


# Create your views here.
class WebsitePasswordCreateView(ListCreateAPIView):
    serializer_class = CreateWebsitePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            websitePassword = serializer.save()
            # response not important since it is a post method
            return Response(WebsitePasswordSerializer(websitePassword).data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get_queryset(self):
        user = self.request.user
        return WebsitePassword.objects.filter(user=user)

    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = WebsitePasswordSerializer(queryset, many=True)
        return Response(serializer.data)


class GetDecryptedPasswordView(CreateAPIView):
    serializer_class = MasterPasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            master_password = serializer.data['master_password']
            encrypted_password = serializer.data['encrypted_password']
            plain_password = decrypt(encrypted_password, master_password)
            data = {
                'plain_password': plain_password
            }
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    


