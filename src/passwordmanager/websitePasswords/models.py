from django.db import models
from django.urls import reverse


# Create your models here.
class WebsitePassword(models.Model):
    user = models.CharField(max_length=120)
    website_url = models.CharField(max_length=120)
    website_name = models.CharField(max_length=120)
    username = models.CharField(max_length=120) 
    password = models.CharField(max_length=120)

    def get_absolute_url(self):
        return reverse("websitepasswords:password-detail", kwargs={"id": self.id})