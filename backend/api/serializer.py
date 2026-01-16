from rest_framework import serializers
from .models import Card, Column, Board

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

class ColumnSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Column
        fields = '__all__'

class BoardSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, required=False, read_only=True)
    
    class Meta:
        model = Board
        fields = '__all__'

class BoardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['board_id', 'board_name']