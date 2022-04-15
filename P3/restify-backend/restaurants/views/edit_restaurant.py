from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restaurants.serializers import EditRestaurantSerializer
from restaurants.models import Restaurant

class EditRestaurantView(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Restaurant.objects.all()

    def get_object(self, pk):
        return Restaurant.objects.filter(id=self.kwargs['pk']).first()

    def patch(self, request, pk):
        # To write a patch function with APIView I used this thread
        # https://stackoverflow.com/questions/21148039/how-to-make-a-patch-request-using-django-rest-framework
        
        requested_restaurant = self.get_object(pk)
        if requested_restaurant is None:
            return Response({'error': 'Restaurant does not exist'}, status=404)
        if requested_restaurant.owner != self.request.user:
            return Response({'error': 'You are not the owner of this restaurant'}, status=401)
        serializer = EditRestaurantSerializer(requested_restaurant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        return Response({'error': 'Check the format of your updated fields below.'}, status=400)