from django.urls import path
from restaurants.views.blogposts import ListBlogposts, AddBlogpostView
from restaurants.views.search import SearchView
from restaurants.views.search import SearchViewEmpty
from restaurants.views.menu import ListMenuItems, AddMenuView, AddMenuItemView, EditMenuItemView
from restaurants.views.get_contact_info import ContactInfoView
from restaurants.views.comment import CommentView
from restaurants.views.followers import FollowerList
from restaurants.views.restaurant_likes import RestaurantLikesList
from restaurants.views.gallery import GalleryView, AddImageView, LogoView
from restaurants.views.blogpost_likes import BlogpostLikes
from restaurants.views.my_restaurant import RestaurantPageView
from restaurants.views.edit_restaurant import EditRestaurantView
from restaurants.views.add_comment import AddCommentView

app_name = 'restaurants'
urlpatterns = [
    path('<str:pk>/blogposts/', ListBlogposts.as_view(), name='blogposts'),
    path('<str:pk>/menu/', ListMenuItems.as_view(), name='menu'),
    path('search/<str:query>/', SearchView.as_view(), name='searchres'),
    path('search/', SearchViewEmpty.as_view(), name='searchres_empty'),  # For the search page with no query
    path('<str:pk>/followers/', FollowerList.as_view(), name='followerlist'),
    path('<str:pk>/edit/', EditRestaurantView.as_view(), name='editrestaurant'),
    path('<str:pk>/likes/', RestaurantLikesList.as_view(), name='likelist'),
    path('blogposts/<str:pk>/likes/', BlogpostLikes.as_view(), name='blogpostlikes'),
    path('<int:pk>/contact/', ContactInfoView.as_view(), name='aboutres'),
    path('<str:pk>/comments/', CommentView.as_view(), name='comments'),
    path('<int:pk>/gallery/', GalleryView.as_view(), name='gallery'),
    path('<int:pk>/logo/', LogoView.as_view(), name='logo'),
    path('<int:pk>/', RestaurantPageView.as_view(), name='restaurantpage'),
    path('<int:restaurant_id>/add-comment/', AddCommentView.as_view(), name='addcomment'),
    path('<int:restaurant_id>/add-image/', AddImageView.as_view(), name='addimage'),
    path('edit-menu/', EditMenuItemView.as_view(), name='editmenu'),
    path('blogpost/add/', AddBlogpostView.as_view(), name='addblog'),
    path('add-menu/', AddMenuView.as_view(), name='addmenu'),
    path('menu/add-item/', AddMenuItemView.as_view(), name='add-menuitem')
]