from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index', ),
    # Make Url that converts units here
]