from rest_framework import serializers

from .models import WebsitePassword
from .encryption import encrypt

class WebsitePasswordSerializer(serializers.ModelSerializer):

    class Meta:
        model = WebsitePassword
        fields = (
            'website_url',
            'website_name',
            'username',
            'password',
            'notes'
        )
