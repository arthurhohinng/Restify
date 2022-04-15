from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import CASCADE
from django.utils import timezone

from restaurants.models import Restaurant, Blogpost


class User(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='avatars/')
    owned_restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True)
    is_owner = models.BooleanField(null=False, default=False)
    phone_num = models.CharField(max_length=11, null=True)


class UserNotifications(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    description = models.TextField()
    link = models.URLField(null=True, blank=True)
    notifier = models.ForeignKey(to=Restaurant, on_delete=CASCADE)
    datetime = models.DateTimeField(default=timezone.now)


class RestaurantNotifications(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE, related_name='restaurant_owner')
    description = models.TextField(null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    notifier = models.ForeignKey(to=User, on_delete=CASCADE)
    datetime = models.DateTimeField(default=timezone.now)


class Feed(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    post = models.ForeignKey(to=Blogpost, on_delete=CASCADE)

    def __str__(self):
        return self.user.username+": "+self.post.title


class LikesRestaurant(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)


class LikesBlog(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    blogpost = models.ForeignKey(to=Blogpost, on_delete=CASCADE)


class Follows(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)

