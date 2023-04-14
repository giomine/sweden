from rest_framework.authentication import BaseAuthentication
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        if not request.headers:
            return None
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None
        if not auth_header.startswith('Bearer'):
            return None
        token = auth_header.replace('Bearer ', '')
        # print('TOKEN -->', token)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            # print('PAYLOAD -->', payload)
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidSignatureError as e:
            print(e.__class__.__name__)
            print(e)
            return None
        except User.DoesNotExist as e:
            print(e.__class__.__name__)
            print(e)
            return None
        
        return (user, token)