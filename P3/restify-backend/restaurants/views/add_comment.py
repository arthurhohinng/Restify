from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restaurants.models import Restaurant, Comment
from accounts.models import User


class AddCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            restaurant = Restaurant.objects.get(id=kwargs['restaurant_id'])
        except ObjectDoesNotExist:
            return Response({"detail": "Restaurant with id={id} does not exist".format(id=kwargs['restaurant_id'])},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            comment = Comment.objects.create(author=self.request.user, restaurant=restaurant, text=request.data['text'])
        return Response(
            {"user": comment.author.id, "restaurant": comment.restaurant.id, "text": comment.text}
            , status=status.HTTP_201_CREATED
        )
