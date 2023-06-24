from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=50, verbose_name='Title')
    description = models.TextField(blank=True, verbose_name='Description')
    done = models.BooleanField(default=False, verbose_name='Done')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Created')

    class Meta:
        verbose_name = 'task'
        verbose_name_plural = 'tasks'

    def __str__(self):
        return f'title={self.title}, description={self.description}, done={self.done}'
