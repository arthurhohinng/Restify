from rest_framework import generics
from accounts.models import Feed
from restaurants.models import Blogpost
from restaurants.serializers import BlogpostSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class FeedView(generics.ListAPIView):
    """
    View to list the feed of a certain user, sorted by date.
    Returns a JSON of the blogposts of a user's feed
    """
    serializer_class = BlogpostSerializer
    permission_classes = [IsAuthenticated]
    queryset = Feed.objects.all()

    def get_queryset(self):
        feed_posts = []
        user_feed = self.queryset.filter(user=self.request.user)

        for post in user_feed:
            feed_posts += list(Blogpost.objects.filter(id=post.post.id).values_list('id', flat=True))

        return Blogpost.objects.filter(id__in=feed_posts).order_by('-date')