from rest_framework.generics import CreateAPIView

from accounts.models import User
from accounts.serializers import UserSerializer


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        User.objects.create(kwargs)
        return
