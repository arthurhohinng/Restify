from rest_framework.generics import RetrieveAPIView
from accounts.serializers import RestaurantContactInfoSerializer

class ContactInfoView(RetrieveAPIView):
    # serializers

    def get_object(self):
        pass