from rest_framework import generics
from restaurants.models import Restaurant
from accounts.models import LikesRestaurant, User
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import RestaurantLikeSerializer

class RestaurantLikesList(generics.ListAPIView):
    """
    View to list all usernames that liked the specified restaurant
    Must be authenticated to view
    """
    serializer_class = RestaurantLikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        liker_set = LikesRestaurant.objects.filter(restaurant=requested_restaurant)
        users = []

        # Want to return the usernames of the users in followers_set
        for liker in liker_set:
            users += list(User.objects.filter(id=liker.user.id).values_list('id', flat=True))
        return User.objects.filter(id__in=users)