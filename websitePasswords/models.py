from django.db import models
from django.contrib.auth.models import User


class WebsitePassword(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    website_url = models.URLField(max_length=120)
    website_name = models.CharField(max_length=120)
    username = models.CharField(max_length=120) 
    password = models.CharField(max_length=10000)
    notes = models.TextField(blank=True)
