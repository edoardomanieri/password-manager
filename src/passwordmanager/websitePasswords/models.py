from django.db import models
from django.urls import reverse


# Create your models here.
class WebsitePassword(models.Model):
    user = models.CharField(max_length=120)
    website_url = models.URLField()
    website_name = models.CharField(max_length=120)
    username = models.CharField(max_length=120) 
    password = models.CharField(max_length=10000)
    notes = models.TextField(blank=True)

    def get_absolute_url(self):
        return reverse("websitepasswords:websitePassword-create")