from rest_framework import serializers
from .models import Task
from django.conf import settings


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('created',)


class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}