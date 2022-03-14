from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import LikesRestaurant, RestaurantNotifications
from accounts.serializers import LikeRestaurantSerializer
from restaurants.models import Restaurant


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
        return Response({"Already liked restaurant"})
