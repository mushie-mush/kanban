from django.http import JsonResponse
from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import UserSerializer

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

class UserLoginView(views.APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'user': UserSerializer(user).data})
        
        return Response({'error': 'Invalid credentials'}, status=400)

class UserLogoutView(views.APIView):

    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'})
    
@method_decorator(csrf_exempt, name='dispatch')
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})