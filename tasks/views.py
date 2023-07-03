from rest_framework import viewsets
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, BasePermission
from .serializers import TaskSerializer
from .models import Task

# Create your views here.
class TasksUserWritePermission(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user

class TaskView(viewsets.ModelViewSet):
    permission_classes = [AllowAny, TasksUserWritePermission]
    serializer_class = TaskSerializer

    def get_queryset(self):
        # Filter tasks by current user
        user = self.request.user
        queryset = Task.objects.all().order_by('created')
        return queryset