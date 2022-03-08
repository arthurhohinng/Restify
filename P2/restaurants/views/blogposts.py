from rest_framework import generics
from django.shortcuts import get_object_or_404
from restaurants.models import Restaurant, Blogpost
from restaurants.serializers import RestaurantSerializer

class ListBlogposts(generics.ListAPIView):
    """
    View to list all blogposts belonging to the specified restaurant.
    No authentication required.
    """
    serializer_class = RestaurantSerializer

    def get(self, req, pk):
        requested_restaurant = Restaurant.objects.filter(id=pk)
        posts = Blogpost.objects.filter(restaurant=requested_restaurant)
        return get_object_or_404(Restaurant, id=pk)