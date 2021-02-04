from django.shortcuts import render


# this will link django to react and from this moment react is taking over
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')