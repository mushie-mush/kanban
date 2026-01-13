from django.db import models

# Create your models here.
class Card(models.Model):
    card_id = models.AutoField(primary_key=True)
    card_title = models.CharField(max_length=255)
    content = models.TextField()
    order = models.IntegerField()
    column_id = models.ForeignKey('Column', on_delete=models.CASCADE, related_name='cards')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=255)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.card_title

class Column(models.Model):
    column_id = models.AutoField(primary_key=True)
    column_title = models.CharField(max_length=255)
    order = models.IntegerField()
    board_id = models.ForeignKey('Board', on_delete=models.CASCADE, related_name='columns')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=255)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.column_title
    
class Board(models.Model):
    board_id = models.AutoField(primary_key=True)
    board_name = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_archived = models.BooleanField(default=False)
    visibility = models.CharField(max_length=50)

    def __str__(self):
        return self.board_name