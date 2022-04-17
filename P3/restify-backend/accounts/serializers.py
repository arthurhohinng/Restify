from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from accounts.models import User, Feed, LikesRestaurant, Follows, LikesBlog


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'avatar', 'owned_restaurant', 'phone_num']


class EditUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)
    avatar = serializers.ImageField(allow_empty_file=True, allow_null=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'avatar', 'owned_restaurant', 'phone_num',
                  'password1', 'password2']

    def update(self, instance, validated_data):
        if 'password1' in validated_data:
            if len(validated_data['password1']) < 8:
                raise ValidationError({'password1': ["This password is too short. "
                                                     "It must contain at least 8 characters"]})
            if validated_data['password1'] != validated_data['password2']:
                raise ValidationError({'password1': ["The two password fields didn't match"]})

            instance.set_password(validated_data['password1'])
            validated_data.pop('password1', None)
            validated_data.pop('password2', None)
            instance.save()

        return super().update(instance, validated_data)


class CreateUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'avatar', 'phone_num']

    def create(self, validated_data):
        if validated_data['password1']:
            if len(validated_data['password1']) < 8:
                raise ValidationError({'password1': ["This password is too short. "
                                                     "It must contain at least 8 characters"]})
            if validated_data['password1'] != validated_data['password2']:
                raise ValidationError({'password1': ["The two password fields didn't match"]})

        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password1'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                avatar=validated_data['avatar'],
                phone_num=validated_data['phone_num']
            )
        except KeyError as e:
            raise ValidationError({"detail": "{error} key must be stated in form data".format(error=e)})
        return user


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class RestaurantLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


# Serializer for user liking restaurant
class LikeRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikesRestaurant
        fields = ['user', 'restaurant']


# Serializer for user following restaurant
class FollowRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follows
        fields = ['user', 'restaurant']


# Serializer for user liking blog
class LikeBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikesBlog
        fields = ['user', 'blogpost']
