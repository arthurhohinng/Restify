from django.contrib import admin
from .models import Restaurant, Blogpost, Menu, MenuItem, Comments

# Register your models here.
admin.site.register(Restaurant)
admin.site.register(Blogpost)
admin.site.register(Menu)
admin.site.register(MenuItem)
admin.site.register(Comments)