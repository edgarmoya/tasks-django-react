from django.contrib import admin
from .models import Task

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'done', 'created')
    search_fields = ('title',)
    list_filter = ('done',)

admin.site.register(Task, TaskAdmin)
