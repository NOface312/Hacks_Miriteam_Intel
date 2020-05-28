from django.db import models
from django.contrib.auth.models import AbstractUser
from factory_manager.models import Workshop, Area, CNC


class CustomUser(AbstractUser):
    POSITION_CHOICES = (
        ('Начальник цеха', 'Начальник цеха'),
        ('Начальник участка', 'Начальник участка'),
        ('Начальник ремонтной службы', 'Начальник ремонтной службы'),
        ('Работник', 'Работник')
    )
    name = models.CharField(blank=True, max_length=120)
    surname = models.CharField(blank=True, max_length=120)
    second_name = models.CharField(blank=True, max_length=120)
    FIO = models.CharField(blank=True, max_length=120)
    position = models.CharField(
        max_length=30, choices=POSITION_CHOICES, blank=True, null=True)
    phone = models.CharField(blank=True, max_length=120)
    email = models.EmailField(max_length=120, unique=True)

    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, null=True)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, null=True)

    def __str__(self):
        title = self.FIO
        return title
