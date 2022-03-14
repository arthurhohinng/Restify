from rest_framework import generics
from django.shortcuts import get_object_or_404
from restaurants.models import Restaurant
from accounts.models import Follows, User
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import FollowerSerializer

class FollowerList(generics.ListAPIView):
    """
    View to list all usernames that are following the specified restaurant.
    Must be authenticated to view follower lists
    """
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        followers_set = Follows.objects.filter(restaurant=requested_restaurant)
        users = []

        # Want to return the usernames of the users in followers_set
        for following in followers_set:
            users += list(User.objects.filter(id=following.user.id).values_list('id', flat=True))
        return User.objects.filter(id__in=users)