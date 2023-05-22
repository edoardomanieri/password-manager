from rest_framework import serializers

from .encryption import encrypt
from .models import WebsitePassword


class MasterPasswordSerializer(serializers.Serializer):
    master_password = serializers.CharField(max_length=100)
    encrypted_password = serializers.CharField(max_length=10000)

    def validate_master_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Wrong Master Password")
        return value


class WebsitePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsitePassword
        fields = "__all__"


class CreateWebsitePasswordSerializer(serializers.ModelSerializer):
    master_password = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = WebsitePassword
        fields = [
            "website_url",
            "website_name",
            "username",
            "password",
            "notes",
            "master_password",
        ]

    def validate(self, data):
        # check that the master password is correct and that the website password is at least 4 character long
        # cleaned_data doesn't work for fields not in model
        master_password = data.get("master_password")
        user = self.context["request"].user
        if not user.check_password(master_password):
            raise serializers.ValidationError("Wrong Master Password")
        return data

    # createAPIview post request is handled by -> .create that calls -> .perform_create that calls -> serializer.save() that calls -> serializer.create() or serializer.update() as needed
    def create(self, validated_data):
        user = self.context["request"].user
        master_password = validated_data.pop("master_password")

        password = validated_data.get("password")
        encrypted_password = encrypt(password, master_password)
        validated_data["password"] = encrypted_password

        data = {**validated_data, "user": user}
        return WebsitePassword.objects.create(**data)

    def update(self, instance, validated_data):
        instance.website_url = validated_data.get("website_url", instance.website_url)
        instance.website_name = validated_data.get(
            "website_name", instance.website_name
        )
        instance.username = validated_data.get("username", instance.username)
        instance.notes = validated_data.get("notes", instance.notes)

        # encrypt password
        password = validated_data.get("password")
        master_password = validated_data.pop("master_password")
        encrypted_password = encrypt(password, master_password)
        validated_data["password"] = encrypted_password
        instance.password = validated_data.get("password", instance.password)
        instance.save()
        return instance
