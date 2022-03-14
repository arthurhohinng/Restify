from rest_framework import views
from restaurants.models import Blogpost
from accounts.models import LikesBlog
from rest_framework.response import Response

class BlogpostLikes(views.APIView):
    """
    Returns the number of likes the specified blogpost has.
    Authentication not required to view this value.
    """

    def get(self, request, pk):
        requested_blogpost = Blogpost.objects.filter(id=pk).first()
        likes = list(LikesBlog.objects.filter(blogpost=requested_blogpost))

        return Response({'count': len(likes)})