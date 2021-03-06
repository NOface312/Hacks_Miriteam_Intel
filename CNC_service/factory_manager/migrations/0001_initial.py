# Generated by Django 2.2.5 on 2020-04-25 23:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name='Workshop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CNC',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('congestion', models.IntegerField(default=0)),
                ('date', models.IntegerField(default=0)),
                ('status', models.CharField(blank=True, choices=[('Работает', 'Работает'), ('Не работает', 'Не работает')], default='Работает', max_length=120, null=True)),
                ('area', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='factory_manager.Area')),
                ('workshop', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='factory_manager.Workshop')),
            ],
        ),
        migrations.AddField(
            model_name='area',
            name='workshop',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='factory_manager.Workshop'),
        ),
    ]
