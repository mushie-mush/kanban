from rest_framework.test import APITestCase
from api.models import Board

class BoardAPITestCase(APITestCase):
    def setUp(self):
        self.board = Board.objects.create(board_name="Test Board")

    def test_get_boards(self):
        response = self.client.get('/api/boards/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['board_name'], "Test Board")

    def test_create_board(self):
        data = {'board_name': 'New Board', 'owner': 'tester', 'is_archived': False, 'visibility': 'public'}
        response = self.client.post('/api/boards/', data, format='json')
        print(response)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Board.objects.count(), 2)
        self.assertEqual(Board.objects.get(board_id=response.data['board_id']).board_name, 'New Board')