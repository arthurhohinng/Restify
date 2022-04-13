from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restaurants.serializers import EditMenuItemSerializer
from restaurants.models import Restaurant, MenuItem, Menu

class EditMenuView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditMenuItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = MenuItem.objects.all()

    def get(self, request, pk):
        requested_restaurant = Restaurant.objects.filter(id=pk).first()
        requested_menu = Menu.objects.filter(owner=requested_restaurant)
        requested_menu_item = MenuItem.objects.filter(menu=requested_menu)
        errors = []
        if requested_restaurant is None:
            errors.append({'error': 'Restaurant does not exist'})
        if requested_menu is None:
            errors.append({'error': 'Menu does not exist'})
        if requested_menu_item is None:
            errors.append({'error': 'Menu item does not exist'})
        if errors:
            return Response(errors, status=404)
        if requested_restaurant.owner != self.request.user:
            # retun 401 unauthorized
            return Response({'error': 'You are not the owner of this restaurant'}, status=401)
        return Response(status=200)
    
    def get_object(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        requested_menu = Menu.objects.filter(owner=requested_restaurant)
        requested_menu_item = MenuItem.objects.filter(menu=requested_menu)
        return requested_menu_item