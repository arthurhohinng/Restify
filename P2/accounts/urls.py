from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.views.edit_profile import EditProfileView
from accounts.views.get_profile import ProfileView

app_name = 'accounts'

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/edit/', EditProfileView.as_view(), name='edit_profile'),
]
