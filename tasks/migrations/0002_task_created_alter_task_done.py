# Generated by Django 4.2.1 on 2023-05-05 02:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Created'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='task',
            name='done',
            field=models.BooleanField(default=False, verbose_name='Done'),
        ),
    ]