from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant, Menu, MenuItem
from restaurants.serializers import MenuItemSerializer, CreateMenuSerializer, EditMenuItemSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
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
                request.data._mutable = True
                request.data['menu'] = menu.id
                request.data._mutable = False
                return super().create(request, *args, **kwargs)
            except ObjectDoesNotExist:
                return Response({"detail": "Restaurant does not have a menu"}, status=status.HTTP_404_NOT_FOUND)


class EditMenuItemView(UpdateAPIView):
    serializer_class = EditMenuItemSerializer
    permission_classes = [IsAuthenticated]

    def has_menu(self, request):
        restaurant = Restaurant.objects.get(owner=request.user)
        try:
            menu = Menu.objects.get(owner=restaurant)
            request.data._mutable = True
            request.data['menu'] = menu.id
            request.data._mutable = False
            return True
        except ObjectDoesNotExist:
            return False

    def get_object(self, request):
        try:
            menu_item = MenuItem.objects.get(id=request.data['id'])
        except ObjectDoesNotExist:
            raise ObjectDoesNotExist
        else:
            return menu_item

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object(request)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        if self.request.user.is_owner:
            if self.has_menu(request):
                return super().update(request, *args, **kwargs)
            return Response({"detail": "Restaurant does not have a menu"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"detail": "User is not a restaurant owner"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        if self.request.user.is_owner:
            if self.has_menu(request):
                return super().partial_update(request, *args, **kwargs)
            return Response({"detail": "Restaurant does not have a menu"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"detail": "User is not a restaurant owner"}, status=status.HTTP_404_NOT_FOUND)

