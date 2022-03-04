from django.views.generic import ListView
from restaurants.models import Blogpost

class BlogpostsView(ListView):
    model = Blogpost