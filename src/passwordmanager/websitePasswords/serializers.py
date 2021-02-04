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
    master_password = serializers.CharField(max_length=100)

    class Meta:
        model = WebsitePassword
        fields = [
            'website_url',
            'website_name',
            'username',
            'password',
            'notes',
            'master_password'
        ]

    def validate(self, data):	
        # check that the master password is correct and that the website password is at least 4 character long	
        # cleaned_data doesn't work for fields not in model	
        master_password = data.get('master_password')
        user = self.context['request'].user
        if not user.check_password(master_password):	
           raise serializers.ValidationError("Wrong Master Password") 	
        password = data.get('password')	
        if len(password) < 4:	
            raise serializers.ValidationError("Password must be at least 4 character long")	
        encrypted_password = encrypt(password, master_password)
        data['password'] = encrypted_password
        return data


    # createAPIview post request is handled by -> .create that call -> .perform_create that call -> serializer.save() that calls -> serializer.create() or serializer.update() as needed
    def create(self, validated_data):
        user = str(self.context['request'].user)
        master_password = validated_data.pop('master_password')
        data = {**validated_data, 'user': user}
        return WebsitePassword.objects.create(**data)
