from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from ..models import Board

class BoardTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='user001', password='password123')
        self.client.login(username='user001', password='password123')

    def test_create_board(self):
        url = reverse('boards')
        data = {
            'name': 'Test Board',
            'description': 'This is a test board'
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Board.objects.filter(name='Test Board').exists())