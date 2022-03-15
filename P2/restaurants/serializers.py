from rest_framework import serializers
from restaurants.models import Restaurant, Blogpost, MenuItem, Comment, AbstractImage
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

class RestaurantGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = AbstractImage
        fields = ['id', 'image', 'restaurant', 'description']

class EditMenuSerializer(serializers.ModelSerializer):
    class Meta:
        pass

class CreateRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'description', 'address', 'postal_code', 'logo', 'phone_num']

    def create(self, validated_data):
        # Make sure this user doesn't already have a restauraunt under their name
        if Restaurant.objects.filter(owner=self.context['request'].user).exists():
            raise serializers.ValidationError("You may only create up to one restaurant.")

        try:
            # Since description is not required
            if 'description' in validated_data:
                new_restaurant = Restaurant.objects.create(
                    name=validated_data['name'],
                    # To access the user creating the restaurant, we do the following:
                    # https://stackoverflow.com/questions/30203652/how-to-get-request-user-in-django-rest-framework-serializer
                    owner=self.context['request'].user,
                    description=validated_data['description'],
                    address=validated_data['address'],
                    postal_code=validated_data['postal_code'],
                    logo=validated_data['logo'],
                    phone_num=validated_data['phone_num']
                )
            else:
                new_restaurant = Restaurant.objects.create(
                    name=validated_data['name'],
                    owner=self.context['request'].user,
                    address=validated_data['address'],
                    postal_code=validated_data['postal_code'],
                    logo=validated_data['logo'],
                    phone_num=validated_data['phone_num']
                )
        except KeyError as e:
            raise serializers.ValidationError({"detail": "{error} key must be stated in form data".format(error=e)})
        return new_restaurant