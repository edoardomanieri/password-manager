from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token



# Create your models here.
class WebsitePassword(models.Model):
    user = models.CharField(max_length=120)
    website_url = models.CharField(max_length=120)
    website_name = models.CharField(max_length=120)
    username = models.CharField(max_length=120) 
    password = models.CharField(max_length=10000)
    notes = models.TextField(blank=True)
