from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantCommentSerializer

class CommentView(RetrieveAPIView):
    serializer_class = RestaurantCommentSerializer

    def get_object(self):
        return self.request.comment