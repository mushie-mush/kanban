from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class UserTests(APITestCase):

    def test_register_user(self):
        url = reverse('register')
        data = {
            'username': 'user001',
            'password': 'password123',
            'email': 'user@mail.com'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='user001').exists())

    def test_login_user(self):
        User.objects.create_user(username='user001', password='password123')

        url = reverse('login')
        data = {
            'username': 'user001',
            'password': 'password123'
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_user(self):
        User.objects.create_user(username='user001', password='password123')

        self.client.login(username='user001', password='password123')
        url = reverse('logout')
        response = self.client.post(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)