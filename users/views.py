from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import UserSerializer
from .models import User
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from lib.exceptions import exceptions


class RegisterView(APIView):
    # ENDPOINT: POST /api/auth/register/
    @exceptions
    def post(self, request):
        # print('REQ DATA --->', request.data)
        user_to_add = UserSerializer(data=request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response(user_to_add.data, status.HTTP_201_CREATED)
    
class LoginView(APIView):
    # ENDPOINT: POST /api/auth/login/
    @exceptions
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user_to_login = User.objects.get(email=email)
        if not user_to_login.check_password(password):
            print("Passwords don't match!")
            raise PermissionDenied('Unauthorized')
        dt = datetime.now() + timedelta(days=7)

        token = jwt.encode({ 'sub': user_to_login.id, 'exp': int(dt.strftime('%s')) }, settings.SECRET_KEY, algorithm='HS256')
        print('TOKEN -->', token)
        return Response({ 'message': f'Welcome back, {user_to_login.username}', 'token': token })