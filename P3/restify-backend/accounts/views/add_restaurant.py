from rest_framework.generics import CreateAPIView
from restaurants.serializers import CreateRestaurantSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant


class AddRestaurantView(CreateAPIView):
    """
    Creates a restaurant belonging to the specified user.
    Authentication is required.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CreateRestaurantSerializer
    queryset = Restaurant.objects.all()
