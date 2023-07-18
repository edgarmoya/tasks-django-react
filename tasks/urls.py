from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from .views import TaskView

# API versioning
router = routers.DefaultRouter()
router.register('tasks', TaskView, 'tasks')

urlpatterns = router.urls

"""urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='Task API')),
]"""