from django.http import QueryDict
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from restaurants.models import Restaurant, Blogpost
from restaurants.serializers import BlogpostSerializer, CreateBlogpostSerializer


class ListBlogposts(generics.ListAPIView):
    """
    View to list all blogposts belonging to the specified restaurant.
    No authentication required.
    """
    serializer_class = BlogpostSerializer

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        # Ordering blogposts by most recently posted (Source: https://www.csestack.org/django-order-by/)
        return Blogpost.objects.filter(restaurant=requested_restaurant).order_by('-date')


class AddBlogpostView(CreateAPIView):
    serializer_class = CreateBlogpostSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if self.request.user.is_owner:
            return self.create(request, *args, **kwargs)
        return Response({"detail": "User is not a restaurant owner"})
