from django import forms
from django.forms import fields

from .encryption import encrypt
from .models import WebsitePassword

class WebsitePasswordForm(forms.ModelForm):

    master_password = forms.CharField(max_length=120)

    def __init__(self, *args, **kwargs):
        """ Grants access to the request object so that only members of the current user
        are given as options"""

        self.user = kwargs.pop('request').user
        super(WebsitePasswordForm, self).__init__(*args, **kwargs)

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
        # check that the master password is correct and that the website password is at least 4 character long
        # cleaned_data doesn't work for fields not in model
        master_password = self.data.get('master_password')
        if not self.user.check_password(master_password):
           raise forms.ValidationError("Wrong Master Password") 
        password = self.cleaned_data.get('password')
        if len(password) < 4:
            raise forms.ValidationError("Password must be at least 4 character long")
        encrypted_password = encrypt(password, master_password)
        return encrypted_password
    


