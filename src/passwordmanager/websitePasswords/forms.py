from django import forms
from django.forms import fields
from cryptography.fernet import Fernet
import base64
import os
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

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
        encrypted_password = self._encrypt(password, master_password)
        return encrypted_password
    

    def _encrypt(self, password, master_password):
        key = self._generate_key(master_password)
        cipher_suite = Fernet(key)
        cipher_text = cipher_suite.encrypt(password.encode())
        # to decode:
        # key2 = self._generate_key(master_password)
        # cipher_suite2 = Fernet(key2)
        # print(cipher_suite2.decrypt(cipher_text).decode())
        return cipher_text


    def _generate_key(self, master_password):
        encoded_master_password = master_password.encode()
        salt = b"\xb9\x1f|}'S\xa1\x96\xeb\x154\x04\x88\xf3\xdf\x05"
        kdf = PBKDF2HMAC(algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=100000,
                backend=default_backend())
        key = base64.urlsafe_b64encode(kdf.derive(encoded_master_password))
        return key
