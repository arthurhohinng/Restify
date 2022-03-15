from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restaurants.serializers import EditRestaurantSerializer
from restaurants.models import Restaurant

class EditRestaurantView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditRestaurantSerializer
    permission_classes = [IsAuthenticated]
    queryset = Restaurant.objects.all()

    def get(self, request, pk):
        requested_restaurant = Restaurant.objects.filter(id=pk).first()
        if requested_restaurant is None:
            return Response({'error': 'Restaurant does not exist'}, status=404)
        if requested_restaurant.owner != self.request.user:
            # retun 401 unauthorized
            return Response({'error': 'You are not the owner of this restaurant'}, status=401)
        return Response(status=200)

    def get_object(self):
        return Restaurant.objects.filter(id=self.kwargs['pk']).first()

