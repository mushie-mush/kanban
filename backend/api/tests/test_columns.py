from rest_framework.test import APITestCase
from api.models import Column, Board

class ColumnAPITestCase(APITestCase):
    def setUp(self):
        self.board = Board.objects.create(board_name="Test Board", owner="tester", visibility="public")
        self.column = Column.objects.create(column_title="Test Column", board_id=self.board, order=1, created_by="tester")

    def test_get_columns(self):
        response = self.client.get('/api/columns/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['column_title'], "Test Column")

    def test_create_column(self):
        data = {'column_title': 'New Column', 'board_id': self.board.board_id, 'order': 2, 'created_by': 'tester'}
        response = self.client.post('/api/columns/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Column.objects.count(), 2)
        self.assertEqual(Column.objects.get(column_id=response.data['column_id']).column_title, 'New Column')

    def test_update_column(self):
        data = {'column_title': 'Updated Column', 'board_id': self.board.board_id, 'order': 1, 'created_by': 'tester'}
        response = self.client.put(f'/api/columns/{self.column.column_id}/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.column.refresh_from_db()
        self.assertEqual(self.column.column_title, 'Updated Column')