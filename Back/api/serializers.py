# Aqui acontece a conversão Model → JSON e JSON → Model

from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Task
        fields = '__all__'
        read_only_fields = ['owner'] # Cliente não pode selecionar dono