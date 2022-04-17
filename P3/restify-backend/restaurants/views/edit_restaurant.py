from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restaurants.serializers import EditRestaurantSerializer
from restaurants.models import Restaurant


class EditRestaurantView(RetrieveAPIView, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditRestaurantSerializer

    def get_object(self):
        restaurant = Restaurant.objects.filter(owner=self.request.user).first()
        return restaurant
