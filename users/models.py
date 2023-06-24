from django.db import models
from django.utils import timezone


# Create your models here.
class AuthToken(models.Model):
    user_id = models.IntegerField()
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

    @classmethod
    def get_active_token(cls, user_id):
        try:
            return cls.objects.get(user_id=user_id, is_active=True)
        except cls.DoesNotExist:
            return None