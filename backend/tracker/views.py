from rest_framework import viewsets
from .models import Project, Task, TaskLog
from .serializers import ProjectSerializer, TaskSerializer, TaskLogSerializer
from rest_framework.permissions import IsAuthenticated

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.owned_projects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(project__owner=self.request.user)

class TaskLogViewSet(viewsets.ModelViewSet):
    queryset = TaskLog.objects.all()
    serializer_class = TaskLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TaskLog.objects.filter(task__project__owner=self.request.user)
