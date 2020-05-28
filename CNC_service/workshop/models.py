from django.db import models
from django.conf import settings
from factory_manager.models import Workshop, Area, CNC


class Request_For_Trouble(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE, null=True)
    boss_workshop = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='boss_workshop_trouble', null=True)
    boss_area = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='boss_area_trouble', null=True)
    date_request = models.DateTimeField(auto_now=True)
    date_deadline = models.DateTimeField(auto_now=True)
    comment = models.TextField()
    
    status = models.CharField(
        max_length=120, blank=True, null=True, default='Отправлено')

