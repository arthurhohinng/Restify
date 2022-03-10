from rest_framework import serializers
from restaurants.models import Restaurant, Blogpost, MenuItem
from accounts.models import User

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class BlogpostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogpost
        fields = '__all__'

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'