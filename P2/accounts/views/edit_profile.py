from rest_framework.generics import UpdateAPIView, RetrieveAPIView

from accounts.serializers import UserSerializer


class EditProfileView(RetrieveAPIView, UpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
