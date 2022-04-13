from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from restaurants.models import Restaurant, Blogpost, MenuItem, Comment, AbstractImage, Menu
from accounts.models import User, Follows, UserNotifications, Feed


class GetRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'followers', 'likes', 'description', 'owner', 'logo']


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


class CreateBlogpostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blogpost
        fields = ['title', 'image', 'body', 'author']

    def create(self, validated_data):
        restaurant = self.context['request'].user.owned_restaurant
        try:
            blogpost = Blogpost.objects.create(
                title=validated_data['title'],
                image=validated_data['image'],
                body=validated_data['body'],
                author=validated_data['author'],
                restaurant=restaurant
            )
        except KeyError as e:
            raise ValidationError({"detail": "{error} key must be stated in form data".format(error=e)})

        followers = Follows.objects.filter(restaurant=restaurant)
        for follower in followers:
            user = follower.user
            description = "{name} uploaded a new blogpost".format(name=restaurant.name)
            notifier = restaurant
            link = "{host}/restaurants/{id}/blogposts/".format(host=self.context['request'].get_host(),
                                                               id=restaurant.id)
            UserNotifications.objects.create(
                user=user,
                description=description,
                notifier=notifier,
                link=link
            )
            Feed.objects.create(user=user, post=blogpost)
        return blogpost


# A serializer to display only the restaurant contact information (the restaurant about page)
class RestaurantContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'address', 'postal_code', 'phone_num']


class RestaurantCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text']

    def create(self, validated_data):
        try:
            new_comment = Comment.objects.create(
                author=self.context['request'].user,
                restuarant=validated_data['restaurant'],
                text=validated_data['text']
            )
        except KeyError as e:
            raise serializers.ValidationError({"detail": "{error} key must be stated in form data".format(error=e)})
        self.context['request'].user.save()
        return new_comment


class RestaurantGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = AbstractImage
        fields = ['id', 'image', 'restaurant', 'description']


class AddImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AbstractImage
        fields = ['id', 'image', 'restaurant', 'description']


class CreateMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
    
    def create(self, validated_data):
        if not Restaurant.objects.filter(owner=self.context['request'].user).exists():
            raise serializers.ValidationError({"error": "Owner doesn't exist."})
        
        try:
            new_menu = Menu.objects.create(owner=self.context['request'].user)
        except KeyError as e:
            raise serializers.ValidationError({"detail": "{error} key must be stated in form data".format(error=e)})
        return new_menu


class CreateRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'description', 'address', 'postal_code', 'logo', 'phone_num']

    def create(self, validated_data):
        # Make sure this user doesn't already have a restauraunt under their name
        if Restaurant.objects.filter(owner=self.context['request'].user).exists():
            raise serializers.ValidationError({"error": "You may only create up to one restaurant."})

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
        # Set the user's status to "owner"
        self.context['request'].user.is_owner = True
        self.context['request'].user.owned_restaurant = new_restaurant
        self.context['request'].user.save()
        return new_restaurant


class EditRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'description', 'address', 'postal_code', 'logo', 'phone_num']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['name', 'menu', 'description', 'price', 'category']


class EditMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['name', 'menu', 'description', 'price', 'category']

    def update(self, instance, validated_data):
        req_restaurant_id = self.context.get('request').parser_context.get('kwargs').get('pk')
        requested_restaurant = Restaurant.objects.filter(id=req_restaurant_id).first()
        if requested_restaurant.owner != self.context['request'].user:
            error = serializers.ValidationError("You are not the owner of this restaurant")
            error.status_code = 401
            raise error
        return super().update(instance, validated_data)
