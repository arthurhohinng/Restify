from django.urls import path
from restaurants.views.blogposts import ListBlogposts
from restaurants.views.search import SearchView
from restaurants.views.menu import ListMenuItems

app_name = 'restaurants'
urlpatterns = [
    path('<str:pk>/blogposts/', ListBlogposts.as_view(), name='blogposts'),
    path('<str:pk>/menu/', ListMenuItems.as_view(), name='menu'),
    path('search/<str:query>/', SearchView.as_view(), name='searchres')
]