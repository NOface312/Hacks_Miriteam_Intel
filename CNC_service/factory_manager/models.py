from django.db import models
from datetime import datetime

#Цех


class Workshop(models.Model):
    name = models.CharField(max_length=120, unique=True)

    def __str__(self):
        title_workshop = str(self.name)
        return title_workshop


#Участок
class Area(models.Model):
    name = models.CharField(max_length=120)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, null=True)

    def __str__(self):
        title_area = str(self.name)
        return title_area


#Станок
class CNC(models.Model):
    STATUS_CHOICES = (
        ('Работает', 'Работает'),
        ('Не работает', 'Не работает')
    )
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=120)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, null=True)
    congestion = models.IntegerField(default=0)
    date = models.IntegerField(default=0)

    status = models.CharField(
        max_length=120, choices=STATUS_CHOICES, blank=True, null=True, default='Работает')

    def __str__(self):
        title_cnc = str(self.name)
        return title_cnc
