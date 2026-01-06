from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth.models import User

# Create your views here.
class TaskListCreateAPIView(APIView):

    def get(self, request):
        tasks = Task.objects.all() # retorna todas as tarefas
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = User.objects.first()  # APENAS para testes
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskStatusChoicesAPIView(APIView):
    def get(self, request):
        return Response([
            {"value": key, "label": label}
            for key, label in Task.STATUS_CHOICES
        ])
    

class TaskDetailAPIView(APIView):

    def patch(self, request, pk):
        task = get_object_or_404(Task, pk=pk)

        serializer = TaskSerializer(
            task,
            data=request.data,
            partial=True  # 🔥 ISSO DEFINE PATCH
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        return Response(
            {"message": "Task removida com sucesso"},
            status=status.HTTP_204_NO_CONTENT
        )