from django.db import models
from django.db.models import CASCADE

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    followers = models.PositiveIntegerField(blank=True, default=0)
    likes = models.PositiveIntegerField(blank=True, default=0)
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
    date = models.DateTimeField(auto_now=True)
    likes = models.PositiveIntegerField(null=False, default=0)

class Comment(models.Model):
    author = models.ForeignKey("accounts.User", null=False, blank=False, on_delete=CASCADE)
    restuarant = models.ForeignKey(Restaurant, null=False, on_delete=CASCADE)
    text = models.CharField(null=False, max_length=350)

class Menu(models.Model):
    owner = models.OneToOneField(Restaurant, null=False, on_delete=CASCADE, unique=True)

class MenuItem(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    menu = models.ForeignKey(Menu, null=False, on_delete=CASCADE)
    description = models.CharField(null=False, blank=False, max_length=50)
    price = models.PositiveIntegerField(null=False, default=0)
    category = models.CharField(null=False, max_length=20) # TODO: This may become its own model or stay like this

class AbstractImage(models.Model):
    image = models.ImageField(null=False)
    restaurant = models.ForeignKey(Restaurant, null=False, on_delete=CASCADE)
    description = models.CharField(null=False, blank=False)
    class Meta:
        abstract = True

# To extend the AbstractImage class, simply do: class YourImageClass(models.AbstractImage) ...