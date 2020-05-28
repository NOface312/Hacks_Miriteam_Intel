from django.db import models
from factory_manager.models import Workshop, Area, CNC
from django.conf import settings


class Request_For_Repair(models.Model):
    STATUS_CHOICES = (
        ('Выполнено', 'Выполнено'),
        ('Выполняется', 'Выполняется'),
        ('Выполнить невозможно', 'Выполнить невозможно'),
        ('Отправлено', 'Отправлено'),
    )
    boss_repair = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='boss_repair_repair', null = True)
    worker = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='worker_repair', null=True)
    status = models.CharField(
        max_length=120, choices=STATUS_CHOICES, blank=True, null=True, default='Отправлено')
    comment = models.TextField()
    date_request = models.DateTimeField(auto_now=True)
    date_deadline = models.DateTimeField(auto_now=True)
    cnc = models.ForeignKey(CNC, on_delete=models.CASCADE, null=True)
