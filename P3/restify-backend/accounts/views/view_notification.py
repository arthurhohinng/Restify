from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import GetUserSerializer
from django.http import JsonResponse
from accounts.models import UserNotifications, RestaurantNotifications
from rest_framework.response import Response


class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        requested_notif = None
        # Check if the user owns this notification
        if not self.request.user.is_owner:
            requested_notif = UserNotifications.objects.filter(id=pk).first()
        else:
            requested_notif = RestaurantNotifications.objects.filter(id=pk).first()
        if requested_notif is None:
            return Response({'error': 'Notification with this ID does not exist.'}, status=404)
        if requested_notif.user != self.request.user:
            return Response({'error': 'You are not authorized to view this notification.'}, status=401)
        
        url_redirect = requested_notif.link
        # Remove the notification from the database
        if not self.request.user.is_owner:
            UserNotifications.objects.get(id=pk).delete()
        else:
            RestaurantNotifications.objects.get(id=pk).delete()
        return Response({'url': url_redirect}, status=200)


class NotificationList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requested_notif = None
        # Check if the user owns this notification
        if not self.request.user.is_owner:
            requested_notif = UserNotifications.objects.filter(user=request.user).order_by('-datetime')
        else:
            requested_notif = RestaurantNotifications.objects.filter(user=request.user).order_by('-datetime')

        return Response(requested_notif.values(), status=200)
