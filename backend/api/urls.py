from django.urls import path
from .views import BoardListView, UserCreateView, UserDetailView, UserLoginView, UserLogoutView, csrf_token_view

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user'),
    path('csrf/', csrf_token_view, name='csrf'),
    path('boards/', BoardListView.as_view(), name='boards'),
]