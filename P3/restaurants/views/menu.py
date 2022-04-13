from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant, Menu, MenuItem
from restaurants.serializers import MenuItemSerializer, CreateMenuSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response


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


class AddMenuView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if self.request.user.is_owner:
            restaurant = Restaurant.objects.get(owner=request.user)
            try:
                Menu.objects.get(owner=restaurant)
            except ObjectDoesNotExist:
                Menu.objects.create(owner=restaurant)
                return Response({"owner": restaurant.id}, status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Restaurant already has a menu"})
        return Response({"detail": "User is not a restaurant owner"})


class AddMenuItemView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MenuItemSerializer

    def post(self, request, *args, **kwargs):
        if self.request.user.is_owner:
            restaurant = Restaurant.objects.get(owner=request.user)
            try:
                menu = Menu.objects.get(owner=restaurant)
                data = request.data.copy()
                data['menu'] = menu.id
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ObjectDoesNotExist:
                return Response({"detail": "Restaurant does not have a menu"}, status=status.HTTP_404_NOT_FOUND)
