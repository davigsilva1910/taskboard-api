from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskListCreateAPIView.as_view()),
    path('tasks/status-choices/', views.TaskStatusChoicesAPIView.as_view()),
    path('tasks/<int:pk>/', views.TaskDetailAPIView.as_view()),
]