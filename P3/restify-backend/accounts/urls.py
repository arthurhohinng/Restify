from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.views.edit_profile import EditProfileView
from accounts.views.get_profile import ProfileView
from accounts.views.like_follow import LikeRestaurantView, FollowRestaurantView, LikesBlogView, CheckLiked, CheckLikedRestaurant, CheckFollowedRestaurant
from accounts.views.register import RegisterView
from accounts.views.feed import FeedView
from accounts.views.add_restaurant import AddRestaurantView, GetRestaurant
from accounts.views.view_notification import NotificationView, NotificationList

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/edit/', EditProfileView.as_view(), name='edit_profile'),
    path('feed/', FeedView.as_view(), name='feed'),
    path('notifications/', NotificationList.as_view(), name='notification_list'),
    path('add-restaurant/', AddRestaurantView.as_view(), name='add_restaurant'),
    path('restaurant/', GetRestaurant.as_view(), name='get_restaurant'),
    path('like/restaurant/<int:restaurant_id>/', LikeRestaurantView.as_view(), name='like_restaurant'),
    path('follow/restaurant/<int:restaurant_id>/', FollowRestaurantView.as_view(), name='follow_restaurant'),
    path('like/blogpost/<int:blogpost_id>/', LikesBlogView.as_view(), name='like_blogpost'),
    path('notifications/<int:pk>/view/', NotificationView.as_view(), name='view_notification'),
    path('blogpost/<int:pk>/isliked/', CheckLiked.as_view(), name='see_liked'),
    path('restaurant/<int:pk>/isliked/', CheckLikedRestaurant.as_view(), name='see_liked_rest'),
    path('restaurant/<int:pk>/followed/', CheckFollowedRestaurant.as_view(), name='see_followed'),
]
