from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantContactInfoSerializer
from rest_framework import views
from restaurants.models import Restaurant
from rest_framework.response import Response

class ContactInfoView(views.APIView):
    def get(self, request, pk):
        requested_restaurant = Restaurant.objects.filter(id=pk).first()
        address = getattr(requested_restaurant, 'address')
        postal_code = getattr(requested_restaurant, 'postal_code')
        phone_num = getattr(requested_restaurant, 'phone_num')
        return Response({'address': address, 'postal_code': postal_code, 'phone_number': phone_num})