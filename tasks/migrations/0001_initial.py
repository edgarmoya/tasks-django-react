# Generated by Django 4.2.1 on 2023-05-05 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('done', models.BooleanField(default=True, verbose_name='Done')),
            ],
            options={
                'verbose_name': 'task',
                'verbose_name_plural': 'tasks',
            },
        ),
    ]
