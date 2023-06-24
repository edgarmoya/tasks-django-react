from .models import AuthToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import timedelta, datetime
from django.utils import timezone


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        current_time = timezone.now().timestamp()
        token['last_login_time'] = current_time
        token['exp'] = datetime.utcnow() + timedelta(minutes=5)
        return token