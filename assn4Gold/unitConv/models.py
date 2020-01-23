from django.db import models

class Conversions(models.Model):
    unit = models.TextField(max_length=30)
    value = models.FloatField()
    theType = models.TextField(max_length=30) 

# Create your models here.
