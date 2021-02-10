from django.db import models



# Create your models here.
class WebsitePassword(models.Model):
    user = models.CharField(max_length=120)
    website_url = models.CharField(max_length=120)
    website_name = models.CharField(max_length=120)
    username = models.CharField(max_length=120) 
    password = models.CharField(max_length=10000)
    notes = models.TextField(blank=True)
