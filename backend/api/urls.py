from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
# router.register('boards', views.BoardViewSet)
router.register('columns', views.ColumnViewSet)
router.register('cards', views.CardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('card/<int:card_id>', views.CardDetail.as_view(), name='card'),
    # path('cards', views.CardList.as_view(), name='card'),
    path('boards/<int:board_id>/', views.BoardDetail.as_view(), name='board'),
    path('boards/', views.BoardList.as_view(), name='board'),
    # path('column/<int:column_id>', views.ColumnDetail.as_view(), name='column'),
    # path('columns', views.ColumnList.as_view(), name='column'),
]