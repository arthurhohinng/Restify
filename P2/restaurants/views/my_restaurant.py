from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantContactInfoSerializer
from rest_framework import views
from restaurants.models import Restaurant
from rest_framework.response import Response

class RestaurantPageView(views.APIView):
    def get(self, request, pk):
        requested_restaurant = Restaurant.objects.filter(id=pk).first()
        name = getattr(requested_restaurant, 'name')
        followers = getattr(requested_restaurant, 'followers')
        likes = getattr(requested_restaurant, 'likes')
        description = getattr(requested_restaurant, 'description')
        owner = getattr(requested_restaurant, 'owner')
        logo = getattr(requested_restaurant, 'logo')
        return Response({'name': name, 'followers': followers, 'likes': likes,
        'description': description, 'owner': owner, 'logo': logo})