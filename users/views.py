from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import jwt
from django.conf import settings
from django.utils import timezone


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            try:
                token = response.data['access']
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                current_time = timezone.now().timestamp()
                last_login_time = float(payload['last_login_time'])
                if current_time - last_login_time > 300:  # 5 minutes
                    raise InvalidToken('Token has expired')
            except jwt.exceptions.DecodeError:
                raise InvalidToken('Token is invalid')
            except KeyError:
                raise InvalidToken('Token is invalid')
            except InvalidToken as e:
                return Response({'success': False, 'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        return response


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)