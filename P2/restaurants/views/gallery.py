from rest_framework import generics
from restaurants.models import Restaurant, AbstractImage
from restaurants.serializers import RestaurantGallerySerializer

class GalleryView(generics.ListAPIView):
    serializer_class = RestaurantGallerySerializer

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        requested_image = AbstractImage.objects.filter(restaurant=requested_restaurant).first()
        return requested_image