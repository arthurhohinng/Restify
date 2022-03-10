from rest_framework import generics
from restaurants.models import Restaurant, Menu, MenuItem
from restaurants.serializers import MenuItemSerializer

class ListMenuItems(generics.ListAPIView):
    """
    View all menu items belonging to a specific restaurant, sorted by
    category.
    """
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        requested_menu = Menu.objects.filter(owner=requested_restaurant).first()
        return MenuItem.objects.filter(menu=requested_menu).order_by('category')