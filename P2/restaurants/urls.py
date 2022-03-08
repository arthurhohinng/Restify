from django.urls import path
from restaurants.views.blogposts import ListBlogposts
from restaurants.views.searchpage import SearchView

app_name = 'restaurants'
urlpatterns = [
    path('<str:pk>/blogposts/', ListBlogposts.as_view(), name='blogposts'),
    path('search/', SearchView.as_view(), name='searchbar')
]