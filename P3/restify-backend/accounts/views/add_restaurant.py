from rest_framework.generics import CreateAPIView
from restaurants.serializers import CreateRestaurantSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from rest_framework.views import APIView
from rest_framework.response import Response


class AddRestaurantView(CreateAPIView):
    """
    Creates a restaurant belonging to the specified user.
    Authentication is required.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CreateRestaurantSerializer
    queryset = Restaurant.objects.all()

class GetRestaurant(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requested_resto = None
        try:
            requested_resto = Restaurant.objects.get(owner=self.request.user)
        except ObjectDoesNotExist:
            return Response({}, status=200)
            
        return Response({requested_resto.id}, status=200)
