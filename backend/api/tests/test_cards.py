from rest_framework.test import APITestCase
from api.models import Card, Column, Board

class CardAPITestCase(APITestCase):
    def setUp(self):
        self.board = Board.objects.create(board_name="Test Board", owner="tester", visibility="public")
        self.column = Column.objects.create(column_title="Test Column", board_id=self.board, order=1, created_by="tester")
        self.card = Card.objects.create(card_title="Test Card", column_id=self.column, order=1, created_by="tester")

    def test_get_cards(self):
        response = self.client.get('/api/cards/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['card_title'], "Test Card")

    def test_create_card(self):
        data = {'card_title': 'New Card', 'content': 'Test content', 'column_id': 1, 'order': 2, 'created_by': 'tester', 'is_archived': False}
        response = self.client.post('/api/cards/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Card.objects.count(), 2)
        self.assertEqual(Card.objects.get(card_id=response.data['card_id']).card_title, 'New Card')

    def test_update_card(self):
        data = {'card_title': 'Updated Card', 'content': 'Updated content', 'column_id': 1, 'order': 1, 'created_by': 'tester', 'is_archived': False}
        response = self.client.put(f'/api/cards/{self.card.card_id}/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.card.refresh_from_db()
        self.assertEqual(self.card.card_title, 'Updated Card')