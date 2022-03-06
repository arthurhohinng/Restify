from rest_framework.views import APIView
from restaurants.models import Blogpost
from restaurants.serializers import RestaurantSerializer

class ListBlogposts(APIView):
    """
    View to list all blogposts belonging to the
    specified restaurant.
    No authentication required.
    """
    serializer_class = RestaurantSerializer

    def get(self, req):
        return get_object_or_404(Restaurant, id=kwargs['pk'])