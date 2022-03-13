from rest_framework import status
from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.serializers import EditUserSerializer

# Received help from: https://stackoverflow.com/questions/38845051/how-to-update-user-password-in-django-rest-framework


class EditProfileView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

