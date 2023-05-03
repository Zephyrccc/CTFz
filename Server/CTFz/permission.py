from rest_framework.permissions import BasePermission
from .models import User, DockerContainer


class IsUserSelf(BasePermission):
    def has_permission(self, request, view):
        if 'user' not in request.data:
            return False
        if request.data['user'] != request.user.id:
            return False
        return True


class IsCaptain(BasePermission):
    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return False
        if request.method == 'DELETE':
            if (user.team != None and user.team.captain != user):
                if user.team.captain == request.user or user == request.user:
                    return True
            return False
        elif user.team != None and user.team.captain == request.user:
            return True
        return False


class CheckCreateTeam(BasePermission):
    def has_permission(self, request, view):
        if 'captain' not in request.data:
            return False
        if request.data['captain'] != request.user.id:
            return False
        return True


class CheckDestroyContainer(BasePermission):
    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        try:
            container = DockerContainer.objects.get(id=pk)
        except DockerContainer.DoesNotExist:
            return False
        if container.user != request.user or container.status == False:
            return False
        return True


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id
