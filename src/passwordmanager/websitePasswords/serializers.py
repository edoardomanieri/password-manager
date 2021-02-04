from rest_framework import serializers

from .models import WebsitePassword
from .encryption import encrypt

# we will use this to send a response back to the browser
class WebsitePasswordSerializer(serializers.ModelSerializer):

    class Meta:
        model = WebsitePassword
        fields = '__all__'


# only the fields that we need for the post request
class CreateWebsitePasswordSerializer(serializers.ModelSerializer):

    master_password = serializers.CharField(max_length=8)

    class Meta:
        model = WebsitePassword
        fields = (
            'website_url',
            'website_name',
            'username',
            'password',
            'notes',
            'master_password'
        )
