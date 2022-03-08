from rest_framework.generics import RetrieveAPIView

from accounts.serializers import UserSerializer


class ProfileView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
