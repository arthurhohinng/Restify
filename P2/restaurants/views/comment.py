from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantCommentSerializer
from restaurants.models import Restaurant, Comment

class CommentView(RetrieveAPIView):
    serializer_class = RestaurantCommentSerializer

    def get_queryset(self):
        requested_restaurant = Restaurant.objects.filter(id=self.kwargs['pk']).first()
        return Comment.objects.filter(restaurant=requested_restaurant)