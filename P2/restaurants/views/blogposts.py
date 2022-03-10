from rest_framework import generics
from django.shortcuts import get_object_or_404
from restaurants.models import Restaurant, Blogpost
from restaurants.serializers import BlogpostSerializer

class ListBlogposts(generics.ListAPIView):
    """
    View to list all blogposts belonging to the specified restaurant.
    No authentication required.
    """
    serializer_class = BlogpostSerializer

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        return Blogpost.objects.filter(restaurant=requested_restaurant)