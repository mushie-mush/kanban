from django.urls import path
from .views import BoardListView, ColumnListView, ColumnDetailView, UserCreateView, UserDetailView, UserLoginView, UserLogoutView, TaskListView, TaskDetailView, csrf_token_view

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user'),
    path('csrf/', csrf_token_view, name='csrf'),
    path('boards/', BoardListView.as_view(), name='boards'),
    path('boards/<int:board_id>/columns/', ColumnListView.as_view(), name='columns'),
    path('boards/<int:board_id>/columns/<int:column_id>/', ColumnDetailView.as_view(), name='column-detail'),
    path('boards/<int:board_id>/columns/<int:column_id>/tasks/', TaskListView.as_view(), name='tasks'),
    path('boards/<int:board_id>/columns/<int:column_id>/tasks/<int:task_id>/', TaskDetailView.as_view(), name='task-detail'),
]