from rest_framework import generics
from restaurants.models import Restaurant, AbstractImage
from restaurants.serializers import RestaurantGallerySerializer, AddImageSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

class GalleryView(generics.ListAPIView):
    serializer_class = RestaurantGallerySerializer

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        requested_image = AbstractImage.objects.filter(restaurant=requested_restaurant).first()
        return requested_image

class AddImageView(CreateAPIView):
    serializer_class = AddImageSerializer

    def post(self, request, *args, **kwargs):
        request.data['restaurant'] = kwargs['restaurant_id']
        try:
            restaurant = Restaurant.objects.get(id=kwargs['restaurant_id'])
        except ObjectDoesNotExist:
            return Response({"detail": "Restaurant with id={id} does not exist".format(id=kwargs['restaurant_id'])},
                            status=status.HTTP_400_BAD_REQUEST)
        AbstractImage.objects.create(restaurant=restaurant)
        return super().create(request, *args, **kwargs)