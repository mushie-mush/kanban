from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from ..models import Board, Column, Task

class ColumnTests(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='user001', password='password123')
        self.client.login(username='user001', password='password123')
    
    def test_create_task(self):
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
        column_id = column_response.data['id']

        task_url = reverse('tasks', kwargs={'board_id': board_id, 'column_id': column_id})
        task_data = {
            'title': 'Test Task',
            'description': 'A task for testing'
        }
        task_response = self.client.post(task_url, task_data, format='json')
        self.assertEqual(task_response.status_code, status.HTTP_201_CREATED)
    
    def test_get_tasks(self):
        board = Board.objects.create(name='Test Board', description='A board for testing', owner=self.user)
        column = Column.objects.create(title='Test Column', description='A column for testing', board=board)
        Task.objects.create(title='Test Task 1', description='First task for testing', column=column)
        Task.objects.create(title='Test Task 2', description='Second task for testing', column=column)

        task_url = reverse('tasks', kwargs={'board_id': board.id, 'column_id': column.id})
        response = self.client.get(task_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_delete_task(self):
        board = Board.objects.create(name='Test Board', description='A board for testing', owner=self.user)
        column = Column.objects.create(title='Test Column', description='A column for testing', board=board)
        task = Task.objects.create(title='Test Task', description='A task for testing', column=column)

        task_url = reverse('task-detail', kwargs={'board_id': board.id, 'column_id': column.id, 'task_id': task.id})
        response = self.client.delete(task_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Task.objects.filter(id=task.id).exists())