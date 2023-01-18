from rest_framework.generics import (
    ListCreateAPIView, GenericAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .serializers import CreateWebsitePasswordSerializer, WebsitePasswordSerializer, MasterPasswordSerializer
from .models import WebsitePassword
from .encryption import decrypt


class WebsitePasswordListCreateView(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateWebsitePasswordSerializer
        elif self.request.method == 'GET':
            return WebsitePasswordSerializer

    def get_queryset(self):
        return WebsitePassword.objects.filter(user=self.request.user)


class WebsitePasswordView(RetrieveUpdateDestroyAPIView):
    serializer_class = CreateWebsitePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        pk = self.kwargs.get('pk')
        return WebsitePassword.objects.get(id=pk)


class DecryptedPasswordRetrieveView(GenericAPIView):
    serializer_class = MasterPasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Has to be a post request because of axios React get implementation
    def post(self, request):
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


