from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist')
]


"""
from django.urls import path
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenRefreshView
from users import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
    path('docs/', include_docs_urls(title='Users API')),
]
"""