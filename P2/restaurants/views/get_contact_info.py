from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantContactInfoSerializer
from rest_framework import views
from restaurants.models import Restaurant

class ContactInfoView(views.APIView):

    def get(self, request, pk):
        requested_restaurant = Restaurant.objects.filter(id=pk).first()