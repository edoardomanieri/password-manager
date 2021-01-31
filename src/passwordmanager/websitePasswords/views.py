from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views.generic import (
    CreateView,
    DetailView,
    ListView,
    UpdateView,
    DeleteView
)

from .forms import WebsitePasswordForm
from .models import WebsitePassword

# Create your views here.
class WebsitePasswordCreateView(CreateView):
    template_name = 'websitePassword_create.html'
    form_class = WebsitePasswordForm
    queryset = WebsitePassword.objects.all()

    def form_valid(self, form):
        return super().form_valid(form)
