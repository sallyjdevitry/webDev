from django.db import models

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    content = models.TextField(max_length=1000)
    posted = models.DateTimeField('date published')

    def __str__(self):
        return self.title

class Comments(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    commenter = models.CharField(max_length=200)
    email = models.EmailField(max_length=300)
    content = models.TextField(max_length = 1000)
    posted = models.DateTimeField('date published comment')

    def __str__(self):
        return self.content



