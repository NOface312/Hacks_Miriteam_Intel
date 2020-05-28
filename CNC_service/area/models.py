from django.db import models
from django.conf import settings
from factory_manager.models import Workshop, Area, CNC


class Request_For_Boss_Repair(models.Model):
    STATUS_CHOICES = (
        ('Выполнено', 'Выполнено'),
        ('Выполняется', 'Выполняется'),
        ('Выполнить невозможно', 'Выполнить невозможно'),
        ('Отправлено', 'Отправлено'),
    )
    TYPE_CHOICES = (
        ('Профилактика', 'Профилактика'),
        ('Ремонт', 'Ремонт'),
    )

    area = models.ForeignKey(Area, on_delete=models.CASCADE, null = True)
    cnc = models.ForeignKey(CNC, on_delete=models.CASCADE, null=True)
    boss_area = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='boss_area_boss_repair', null=True)
    boss_repair = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='boss_repair_boss_repair', null=True)
    date_request = models.DateTimeField(auto_now=True)
    date_deadline = models.DateTimeField(auto_now=True)
    comment = models.TextField()

    status = models.CharField(
        max_length=120, choices=STATUS_CHOICES, blank=True, null=True, default='Отправлено')

    type_request = models.CharField(
        max_length=120, choices=TYPE_CHOICES, blank=True, null=True, default='Профилактика')

