from rest_framework import serializers
from restaurants.models import Restaurant, Blogpost, MenuItem
from accounts.models import User

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

# A simplified version of the Restaurant serializer, for the search result cards
class RestaurantSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'followers', 'address', 'postal_code', 'logo']

class BlogpostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogpost
        fields = '__all__'

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

# A serializer to display only the restaurant contact information (the restaurant about page)
class RestaurantContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'address', 'postal_code', 'phone_num']

class RestaurantCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author', 'restaurant', 'text']