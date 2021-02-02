from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.urls import reverse
from django.http import JsonResponse
from django.views.generic import (
    CreateView,
    DetailView,
    ListView,
    UpdateView,
    DeleteView
)

from .forms import WebsitePasswordForm
from .models import WebsitePassword
from .encryption import decrypt


# Create your views here.
class WebsitePasswordCreateView(CreateView):
    template_name = 'websitePassword_create.html'
    form_class = WebsitePasswordForm
    queryset = WebsitePassword.objects.all()

 
    def form_valid(self, form):
        # insert the user into the database row before committing
        obj = form.save(commit=False)
        obj.user = str(self.request.user)
        obj.save()
        return super().form_valid(form)


    def get_form_kwargs(self):
        """ Passes the request object to the form class.
        This is necessary to check that the master password is correct"""

        kwargs = super(WebsitePasswordCreateView, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs


class WebsitePasswordListView(ListView):
    template_name = 'websitepassword_list.html'
    queryset = WebsitePassword.objects.all()

    def get_queryset(self):
        return WebsitePassword.objects.filter(user=self.request.user) 


class WebsitePasswordDetailView(DetailView):
    template_name = 'websitepassword_detail.html'

    def get_object(self):
        id_ = self.kwargs.get("id")
        return get_object_or_404(WebsitePassword, id=id_)


## ajax function view
def get_decrypted_password(request, *args, **kwargs):
    master_password = request.POST['master_password']
    print(master_password + "ciao")
    wrong_password = not request.user.check_password(master_password)
    id_ = kwargs.get("id")
    encrypted_password = get_object_or_404(WebsitePassword, id=id_).password
    plain_password = "" if wrong_password else decrypt(encrypted_password, master_password)
    data = {
        'wrong_password': wrong_password,
        'plain_password': plain_password
    }
    return JsonResponse(data)

    


