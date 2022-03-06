from django.urls import path
from restaurants.views.blogposts import ListBlogposts

app_name = 'restaurants'
urlpatterns = [
    path('<str:pk>/blogposts/', ListBlogposts.as_view(), name='blogposts'),
]