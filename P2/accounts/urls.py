from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.views.edit_profile import EditProfileView
from accounts.views.get_profile import ProfileView
from accounts.views.register import RegisterView
from accounts.views.feed import FeedView

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/edit/', EditProfileView.as_view(), name='edit_profile'),
    path('feed/', FeedView.as_view(), name='feed'),
]
