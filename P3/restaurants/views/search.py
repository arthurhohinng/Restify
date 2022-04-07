from rest_framework import generics
from restaurants.models import Restaurant, MenuItem
from restaurants.serializers import RestaurantSearchSerializer

class SearchView(generics.ListAPIView):
    """
    View for the search form, where users can search for restaurants.
    URL's query is used to return JSON of matching restaurants.
    Authentication is not required.
    """
    serializer_class = RestaurantSearchSerializer

    def get_queryset(self):
        # First, extract the query from the URL
        search_query = self.kwargs['query']
        results = Restaurant.objects.none()
        query_words = search_query.split(" ")

        # Since we have pagination implemented on this page, yet we are also unioning querysets, SQLite gets mad about it.
        # The code below is based off the "values_list" solution provided in the answer to this SO post, to bypass the error:
        # https://stackoverflow.com/questions/65577792/error-order-by-not-allowed-in-subqueries-of-compound-statements-in-django-whi

        matching_name = []
        matching_addr = []
        matching_menu = []

        for word in query_words:
            matching_name += list(Restaurant.objects.filter(name__icontains=word).values_list('id', flat=True))
            matching_addr += list(Restaurant.objects.filter(address__icontains=word).values_list('id', flat=True))
            # Searching for Restaurants with matching menu items
            matching_menu_items = MenuItem.objects.filter(name__icontains=word)
            for item in matching_menu_items:
                matching_menu += list(Restaurant.objects.filter(id=item.menu.owner.id).values_list('id', flat=True))

        all_ids = matching_name + matching_addr + matching_menu
        return Restaurant.objects.filter(id__in=all_ids).order_by('-followers')