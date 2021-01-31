from django import forms
from django.forms import fields

from .models import WebsitePassword

class WebsitePasswordForm(forms.ModelForm):

    master_password = forms.CharField(max_length=120)

    def __init__(self, user, *args, **kwargs):
        super(WebsitePasswordForm, self).__init__(*args, **kwargs)
        user = user

    class Meta:
        model = WebsitePassword
        fields = [
            'website_url',
            'website_name',
            'username',
            'password',
            'notes'
        ]

        def clean_password(self):
            password = self.cleaned_data.get('password')
            if len(password) < 4:
                raise forms.ValidationError("Password must be at least 4 character long")
            return password