from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import LikesRestaurant, RestaurantNotifications, Follows, LikesBlog
from accounts.serializers import LikeRestaurantSerializer, FollowRestaurantSerializer, LikeBlogSerializer
from restaurants.models import Restaurant, Blogpost


class LikeRestaurantView(CreateAPIView):
    serializer_class = LikeRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data['restaurant'] = kwargs['restaurant_id']
        request.data['user'] = self.request.user.id
        try:
            restaurant = Restaurant.objects.get(id=kwargs['restaurant_id'])
        except ObjectDoesNotExist:
            return Response({"detail": "Restaurant with id={id} does not exist".format(id=kwargs['restaurant_id'])},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                LikesRestaurant.objects.get(user=self.request.user, restaurant=restaurant)
            except ObjectDoesNotExist:
                restaurant.likes += 1
                restaurant.save()
                description = "{user} liked your restaurant.".format(user=self.request.user.username)
                RestaurantNotifications.objects.create(user=restaurant.owner, description=description,
                                                       notifier=self.request.user)
                return super().create(request, *args, **kwargs)
        return Response({"detail": "Already liked restaurant"})


class FollowRestaurantView(CreateAPIView):
    serializer_class = FollowRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data['restaurant'] = kwargs['restaurant_id']
        request.data['user'] = self.request.user.id
        try:
            restaurant = Restaurant.objects.get(id=kwargs['restaurant_id'])
        except ObjectDoesNotExist:
            return Response({"detail": "Restaurant with id={id} does not exist".format(id=kwargs['restaurant_id'])},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                Follows.objects.get(user=self.request.user, restaurant=restaurant)
            except ObjectDoesNotExist:
                restaurant.followers += 1
                restaurant.save()
                description = "{user} started following your restaurant.".format(user=self.request.user.username)
                RestaurantNotifications.objects.create(user=restaurant.owner, description=description,
                                                       notifier=self.request.user)
                return super().create(request, *args, **kwargs)
        return Response({"detail": "Already following restaurant"})


class LikesBlogView(CreateAPIView):
    serializer_class = LikeBlogSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data['blogpost'] = kwargs['blogpost_id']
        request.data['user'] = self.request.user.id
        try:
            blogpost = Blogpost.objects.get(id=kwargs['blogpost_id'])
        except ObjectDoesNotExist:
            return Response({"detail": "Blogpost with id={id} does not exist".format(id=kwargs['blogpost_id'])},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                LikesBlog.objects.get(user=self.request.user, blogpost=blogpost)
            except ObjectDoesNotExist:
                blogpost.likes += 1
                blogpost.save()
                description = "{user} liked your blogpost.".format(user=self.request.user.username)
                RestaurantNotifications.objects.create(user=blogpost.restaurant.owner, description=description,
                                                       notifier=self.request.user)
                return super().create(request, *args, **kwargs)
        return Response({"detail": "Already liked blogpost"})
