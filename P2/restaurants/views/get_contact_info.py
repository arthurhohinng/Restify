from rest_framework.generics import RetrieveAPIView
from accounts.serializers import RestaurantContactInfoSerializer

class ContactInfoView(RetrieveAPIView):
    serializer_class = RestaurantContactInfoSerializer

    def get_object(self):
        self.request.restaurant