from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Feed, Follows, LikesRestaurant

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Feed)
admin.site.register(Follows)
admin.site.register(LikesRestaurant)