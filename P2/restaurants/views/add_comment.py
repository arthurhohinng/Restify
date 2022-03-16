import imp
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restaurants.serializers import RestaurantCommentSerializer
from restaurants.models import Restaurant, Comment
from accounts.models import User

class AddCommentView(CreateAPIView):
    serializer_class = RestaurantCommentSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data['restaurant'] = kwargs['restaurant_id']
        request.data['user'] = self.request.user.id
        request.data['text'] = kwargs['text']
        try:
            restaurant = Restaurant.objects.get(id=kwargs['restaurant_id'])
        except ObjectDoesNotExist:
            return Response({"detail": "Restaurant with id={id} does not exist".format(id=kwargs['restaurant_id'])},
                            status=status.HTTP_400_BAD_REQUEST)
        return self.create(request, *args, **kwargs)