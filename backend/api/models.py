from django.db import models


class Board(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True, max_length=1000)
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Column(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True, max_length=1000)
    board = models.ForeignKey(Board, related_name='columns', on_delete=models.CASCADE)

    def __str__(self):
        return self.title