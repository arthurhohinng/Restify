from django.urls import path
from restaurants.views.blogposts import BlogpostsView

app_name = 'restaurants'
urlpatterns = [
    path('<str:pk>/blogposts/', BlogpostsView.as_view(), name='blogposts'),
]