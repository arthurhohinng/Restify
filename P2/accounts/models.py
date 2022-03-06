from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import CASCADE
from restaurants.models import Restaurant, Blogpost


class User(AbstractUser):
    avatar = models.ImageField(null=True)
    owned_restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True)
    is_owner = models.BooleanField(null=False, default=False)


class Notification(models.Model):
    notifier = models.CharField(max_length=100)
    description = models.TextField(max_length=500)


class Feed(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    post = models.ForeignKey(to=Blogpost, on_delete=CASCADE)


class LikesRestaurant(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)


class LikesBlog(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    blogpost = models.ForeignKey(to=Blogpost, on_delete=CASCADE)


class Follows(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)

