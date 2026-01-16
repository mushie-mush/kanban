from django.http import JsonResponse

from rest_framework import serializers, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Board, Column, Card
from .serializer import BoardSerializer, ColumnSerializer, CardSerializer


# TODO: Replace these with actual IDs from boards and columns tables
# BOARD_ID = "board_12345"
# COLUMN_IDS = {
#     "1": "To Do",
#     "2": "In Progress",
#     "3": "Done"
# }
# CARDS = [
#     {"id": "card_1", "title": "Sample Card 1", "board_id": "board_12345", "column_id": "1"},
#     {"id": "card_2", "title": "Sample Card 2", "board_id": "board_12345", "column_id": "1"},
# ]


# Create your views here.
class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

# class BoardDetail(APIView):
#     def get(self, request, board_id):
#         board = Board.objects.get(board_id=board_id)
#         serializer = BoardSerializer(board)

#         return JsonResponse({"message": "Board endpoint", "payload": serializer.data})

# class BoardList(APIView):
#     def post(self, request):
#         serializer = BoardSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ColumnDetail(APIView):
#     def get(self, request, column_id):
#         column = Column.objects.get(column_id=column_id)
#         serializer = ColumnSerializer(column)

#         return JsonResponse({"message": "Column endpoint", "payload": serializer.data})

# class ColumnList(APIView):
#     def post(self, request):
#         serializer = ColumnSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class CardDetail(APIView):
#     def get(self, request, card_id):
#         serializer = CardSerializer(Card.objects.get(card_id=card_id))
#         return JsonResponse({"message": "Card endpoint", "payload": serializer.data})

# class CardList(APIView):
#     def post(self, request):
#         serializer = CardSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @csrf_exempt
# def card(request):
#     if request.method == "GET":
#         board_id = request.GET.get("board_id")
#         column_id = request.GET.get("column_id")

#         # TODO: Replace this with actual DB query to fetch cards based on board_id and column_id
#         cards = list(filter(lambda card: card["board_id"] == board_id and card["column_id"] == column_id, CARDS))

#         return JsonResponse({"message": "Hello world", "cards": cards})
#     elif request.method == "POST":
#         data = json.loads(request.body)

#         title = data.get("title")
#         board_id = data.get("board_id")
#         column_id = data.get("column_id")

#         # TODO: Replace this with actual DB operation to create a new card
#         new_card = {
#             "title": title,
#             "board_id": board_id,
#             "column_id": column_id
#         }

#         return JsonResponse({"message": "Card created", "new_card": new_card})