from django.db import models
from django.db.models import CASCADE


class Restaurant(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    followers = models.PositiveIntegerField(blank=True, default=0)
    likes = models.PositiveIntegerField(blank=True, default=0)
    description = models.TextField(null=True, blank=True)
    owner = models.ForeignKey("accounts.User", null=False, on_delete=CASCADE)
    address = models.CharField(max_length=50, null=False)
    postal_code = models.CharField(max_length=6, null=False)
    logo = models.ImageField(null=False)
    phone_num = models.CharField(max_length=11, null=False)

    # Ordering restaurant JSON objects by popularity (followers)
    class Meta:
        ordering = ['followers']

    def __str__(self):
        return self.name


class Blogpost(models.Model):
    title = models.CharField(null=False, blank=False, max_length=50)
    image = models.ImageField(null=True, blank=True)
    body = models.TextField(null=False)
    author = models.CharField(null=False, blank=False, max_length=15)
    restaurant = models.ForeignKey(Restaurant, null=False, on_delete=CASCADE)
    date = models.DateTimeField(auto_now=True)
    likes = models.PositiveIntegerField(null=False, default=0)

    def __str__(self):
        return self.title+" ("+self.restaurant.name+")"


class Comment(models.Model):
    author = models.ForeignKey("accounts.User", null=False, blank=False, on_delete=CASCADE)
    restaurant = models.ForeignKey(Restaurant, null=False, on_delete=CASCADE)
    text = models.CharField(null=False, max_length=50)


class Menu(models.Model):
    owner = models.OneToOneField(Restaurant, null=False, on_delete=CASCADE, unique=True)

    def __str__(self):
        return self.owner.name


class MenuItem(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    menu = models.ForeignKey(Menu, null=False, on_delete=CASCADE)
    description = models.CharField(null=False, blank=False, max_length=50)
    price = models.FloatField(null=False, blank=False, default=0.0)
    category = models.CharField(null=False, max_length=20)

    def __str__(self):
        return self.name+" ("+self.category+")"


class AbstractImage(models.Model):
    image = models.ImageField(null=False)
    restaurant = models.ForeignKey(Restaurant, null=False, on_delete=CASCADE)
    description = models.CharField(null=False, blank=False)
    class Meta:
        abstract = True
