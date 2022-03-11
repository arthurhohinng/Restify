from rest_framework.generics import CreateAPIView

from accounts.models import User
from accounts.serializers import CreateUserSerializer


class RegisterView(CreateAPIView):
    serializer_class = CreateUserSerializer


