from rest_framework.generics import CreateAPIView
from accounts.serializers import CreateUserSerializer


class RegisterView(CreateAPIView):
    serializer_class = CreateUserSerializer


