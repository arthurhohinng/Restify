from django.core.exceptions import ObjectDoesNotExist
from rest_framework.generics import RetrieveAPIView

from restaurants import serializers
from restaurants.serializers import GetRestaurantSerializer
from rest_framework import views
from restaurants.models import Restaurant
from rest_framework.response import Response


class RestaurantPageView(RetrieveAPIView):
    """
    Gets a restaurant using pk from url.
    """
    serializer_class = GetRestaurantSerializer

    def get(self, request, pk):
        try:
            requested_restaurant = Restaurant.objects.get(id=pk)
            serializer = self.get_serializer(requested_restaurant)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Restaurant does not exist")
