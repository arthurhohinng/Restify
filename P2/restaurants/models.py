from django.db import models
from django.db.models import CASCADE

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    followers = models.PositiveIntegerField(null=False, default=0)
    likes = models.PositiveIntegerField(null=False, default=0)
    description = models.TextField(null=True, blank=True)
    owner = models.ForeignKey("accounts.User", null=False, on_delete=CASCADE)
    # TODO: add menu as Menu
    address = models.CharField(max_length=50, null=False)
    postal_code = models.CharField(max_length=6, null=False)
    logo = models.ImageField(null=False)
    phone_num = models.CharField(max_length=11, null=False)

class Blogpost(models.Model):
    title = models.CharField(null=False, blank=False, max_length=25)
    image = models.ImageField(null=True, blank=True)
    body = models.TextField(null=False)
    author = models.CharField(null=False, blank=False, max_length=15)
    restaurant = models.ForeignKey(Restaurant, null=False, on_delete=CASCADE)
    posted = models.DateTimeField(auto_now=True)
    likes = models.PositiveIntegerField(null=False, default=0)