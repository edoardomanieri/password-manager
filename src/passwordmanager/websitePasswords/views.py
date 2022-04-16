from rest_framework.generics import (
    CreateAPIView, ListCreateAPIView, UpdateAPIView, DestroyAPIView
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .serializers import CreateWebsitePasswordSerializer, WebsitePasswordSerializer, MasterPasswordSerializer
from .models import WebsitePassword
from .encryption import decrypt
import logging


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
        return WebsitePassword.objects.filter(user=self.request.user)

    
    def list(self, request):
        try: 
            queryset = self.get_queryset()
            serializer = WebsitePasswordSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as exp:
          logging.error(exp)  # For python 3
          return Response(exp, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


class WebsitePasswordUpdateView(UpdateAPIView):
    serializer_class = CreateWebsitePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

        
    def update(self, request, *args,  **kwargs):
        id = self.kwargs.get('pk')
        old_instance = WebsitePassword.objects.get(id=id)
        serializer = self.get_serializer(old_instance, data=request.data)
        if serializer.is_valid():
            websitePassword = serializer.save()
            # response not important since it is a put method (but still have to override to specify the right Serializer (without master password))
            return Response(WebsitePasswordSerializer(websitePassword).data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WebsitePasswordDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        id = self.kwargs.get('pk')
        return WebsitePassword.objects.filter(id=id)


    def perform_destroy(self, request, *args,  **kwargs):
        id = self.kwargs.get('pk')
        instance = WebsitePassword.objects.get(id=id)
        instance.delete()


