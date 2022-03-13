from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantContactInfoSerializer

class ContactInfoView(RetrieveAPIView):
    serializer_class = RestaurantContactInfoSerializer

    def get_object(self):
        self.request.restaurant