from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantContactInfoSerializer, RestaurantSerializer
from rest_framework import views
from restaurants.models import Restaurant
from rest_framework.response import Response

class RestaurantPageView(views.APIView):
    def get(self, request, pk):
        requested_restaurant = Restaurant.objects.filter(id=pk).first()
        name = requested_restaurant.name
        followers = requested_restaurant.followers
        likes = requested_restaurant.likes
        description = requested_restaurant.description
        owner = requested_restaurant.owner
        logo = requested_restaurant.logo
        return Response({'name': name, 'followers': followers, 'likes': likes, 'description': description,
                         'owner': owner.id})
