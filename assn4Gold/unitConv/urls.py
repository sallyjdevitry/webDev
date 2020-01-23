from django.urls import path
from . import views

urlpatterns = [
    path('', views.createConversionInstances, name='conv'),
    # path('init', views.createConversionInstances, name='init'),
    path('convert', views.doConversion, name='convert'),
    # Make Url that converts units here
]
