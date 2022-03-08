from rest_framework import generics
from accounts.models import Feed
from accounts.serializers import FeedSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class FeedView(generics.ListAPIView):
    """
    View to list the feed of a certain user, sorted by date.
    """
    serializer_class = FeedSerializer
    permission_classes = [IsAuthenticated]
    queryset = Feed.objects.all()

    # Returning a custom set of objects like this is done with the help of this tutorial
    # https://www.youtube.com/watch?v=cJveiktaOSQ 
    def get(self, request):
        user_feed = self.queryset.filter(user=request.user)
        return Response(self.serializer_class(user_feed, many=True).data)