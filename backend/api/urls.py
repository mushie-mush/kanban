from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'boards', views.BoardViewSet)
router.register(r'columns', views.ColumnViewSet)
router.register(r'cards', views.CardViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('', include(router.urls)),
]

# urlpatterns = [
#     path('', views.index, name='index'),
#     path('card/<int:card_id>', views.CardDetail.as_view(), name='card'),
#     path('cards', views.CardList.as_view(), name='card'),
#     path('boards/<int:board_id>', views.BoardDetail.as_view(), name='board'),
#     path('boards', views.BoardList.as_view(), name='board'),
#     path('column/<int:column_id>', views.ColumnDetail.as_view(), name='column'),
#     path('columns', views.ColumnList.as_view(), name='column'),
# ]