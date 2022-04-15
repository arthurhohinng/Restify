from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Feed, Follows, LikesRestaurant, LikesBlog, RestaurantNotifications, UserNotifications

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Feed)
admin.site.register(Follows)
admin.site.register(LikesRestaurant)
admin.site.register(LikesBlog)
admin.site.register(RestaurantNotifications)
admin.site.register(UserNotifications)