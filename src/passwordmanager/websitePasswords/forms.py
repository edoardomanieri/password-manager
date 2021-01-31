from django import forms
from django.forms import fields

from .models import WebsitePassword

class WebsitePassword(forms.ModelForm):
    class Meta:
        model = WebsitePassword
        fields = [
            'website_url',
            'website_name',
            'username',
            'password'
        ]

        def clean_password(self):
            password = self.cleaned_data.get('password')
            if len(password) < 4:
                raise forms.ValidationError("Password must be at least 4 character long")
            return password