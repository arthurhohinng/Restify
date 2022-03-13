from rest_framework import generics
from restaurants.models import Restaurant, MenuItem
from restaurants.serializers import RestaurantSerializer

class SearchView(generics.ListAPIView):
    """
    View for the search form, where users can search for restaurants.
    URL's query is used to return JSON of matching restaurants.
    Authentication is not required.
    """
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        # First, extract the query from the URL
        search_query = self.kwargs['query']
        print(search_query)

        # Seperate query into words to search using each one
        results = Restaurant.objects.none()

        # TODO: union results with menu item descriptions/names
        return results.union(Restaurant.objects.filter(name__icontains=search_query), 
                             Restaurant.objects.filter(name__icontains=search_query))