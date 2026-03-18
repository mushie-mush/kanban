from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from ..models import Board, Column

class ColumnTests(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='user001', password='password123')
        self.client.login(username='user001', password='password123')

    def test_create_column(self):
        board_url = reverse('boards')
        board_data = {
            'name': 'Test Board',
            'description': 'A board for testing'
        }
        board_response = self.client.post(board_url, board_data, format='json')
        self.assertEqual(board_response.status_code, status.HTTP_201_CREATED)
        board_id = board_response.data['id']

        column_url = reverse('columns', kwargs={'board_id': board_id})
        column_data = {
            'title': 'Test Column',
            'description': 'A column for testing'
        }
        column_response = self.client.post(column_url, column_data, format='json')
        self.assertEqual(column_response.status_code, status.HTTP_201_CREATED)

    def test_delete_column(self):
        board = Board.objects.create(name='Test Board', description='A board for testing', owner=self.user)
        column = Column.objects.create(title='Test Column', description='A column for testing', board=board)

        column_url = reverse('column-detail', kwargs={'board_id': board.id, 'column_id': column.id})
        delete_response = self.client.delete(column_url)
        self.assertEqual(delete_response.status_code, status.HTTP_200_OK)