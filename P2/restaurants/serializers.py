from rest_framework import serializers
from restaurants.models import Restaurant, Blogpost
from accounts.models import User

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'