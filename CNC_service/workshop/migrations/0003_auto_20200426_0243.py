# Generated by Django 2.2.5 on 2020-04-25 23:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workshop', '0002_auto_20200426_0242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request_for_trouble',
            name='area',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='factory_manager.Area'),
        ),
    ]
