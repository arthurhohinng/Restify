from django.db import models
from django.contrib.auth.models import AbstractUser

from restaurants.models import Restaurant, Blogpost


class User(AbstractUser):
    avatar = models.ImageField(null=True)
    restaurant = models.ForeignKey(to=Restaurant)
    is_owner = models.BooleanField()


class Notification(models.Model):
    notifier = models.CharField(max_length=100)
    description = models.TextField()


class Feed(models.Model):
    user = models.ForeignKey(to=User)
    # blogpost


class LikesRestaurant(models.Model):
    user = models.ForeignKey(to=User)
    restaurant = models.ForeignKey(to=Restaurant)


class LikesBlog(models.Model):
    user = models.ForeignKey(to=User)
    blogpost = models.ForeignKey(to=Blogpost)


class Follows(models.Model):
    user = models.ForeignKey(to=User)
    restaurant = models.ForeignKey(to=Restaurant)

