from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import BoardSerializer, ColumnSerializer, UserSerializer
from .models import Board, Column

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

class BoardListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        boards = Board.objects.filter(owner=request.user)
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BoardSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)
    
    def delete(self, request):
        board_id = request.data.get('id')
        board = Board.objects.get(id=board_id, owner=request.user)
        board.delete()
        return Response({'message': 'Board deleted successfully'})
    
class ColumnListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, board_id):
        board = get_object_or_404(Board, id=board_id, owner=request.user)

        serializer = ColumnSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(board=board)
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)
    
    def get(self, request, board_id):
        board = get_object_or_404(Board, id=board_id, owner=request.user)
        columns = Column.objects.filter(board=board)
        serializer = ColumnSerializer(columns, many=True)
        return Response(serializer.data)