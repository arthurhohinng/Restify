from rest_framework.views import APIView
from restaurants.models import Restaurant, Blogpost
from restaurants.serializers import RestaurantSerializer

class SearchView(APIView):
    """
    View for the search form, where users can search for restaurants.
    Authentication is not required.
    """
    pass