# Generated by Django 2.2.5 on 2020-04-25 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='FIO',
            field=models.CharField(blank=True, max_length=120),
        ),
    ]
