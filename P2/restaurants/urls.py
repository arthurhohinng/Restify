from django.urls import path
from restaurants.views.blogposts import ListBlogposts
from restaurants.views.search import SearchView
from restaurants.views.menu import ListMenuItems
from restaurants.views.get_contact_info import ContactInfoView
from restaurants.views.comment import CommentView
from restaurants.views.followers import FollowerList
from restaurants.views.restaurant_likes import RestaurantLikesList
from restaurants.views.gallery import GalleryView
from restaurants.views.blogpostlikes import BlogpostLikes
from restaurants.views.my_restaurant import RestaurantPageView

app_name = 'restaurants'
urlpatterns = [
    path('<str:pk>/blogposts/', ListBlogposts.as_view(), name='blogposts'),
    path('<str:pk>/menu/', ListMenuItems.as_view(), name='menu'),
    path('search/<str:query>/', SearchView.as_view(), name='searchres'),
    path('<str:pk>/followers/', FollowerList.as_view(), name='followerlist'),
    path('<str:pk>/likes/', RestaurantLikesList.as_view(), name='likelist'),
    path('blogposts/<str:pk>/likes/', BlogpostLikes.as_view(), name='blogpostlikes'),
    path('restaurant/contact/', ContactInfoView.as_view(), name='aboutres'), # TODO: may need to change url
    path('restaurant/comments/', CommentView.as_view(), name='comments'),
    path('restaurant/gallery/', GalleryView.as_view(), name='gallery'),
    path('restaurant/<str:pk>/', RestaurantPageView.as_view(), name='restaurantpage')
]