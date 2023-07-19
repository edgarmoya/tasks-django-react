from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, BasePermission
from .serializers import TaskSerializer
from rest_framework.pagination import PageNumberPagination
from .models import Task

# Create your views here.
class TasksUserWritePermission(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user

class TaskView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, TasksUserWritePermission]
    serializer_class = TaskSerializer
    pagination_class = PageNumberPagination
    page_size = 9

    def get_queryset(self):
        # Filter tasks by current user
        user = self.request.user
        queryset = Task.objects.filter(user=user).order_by('created')
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)