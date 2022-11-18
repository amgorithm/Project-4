from rest_framework import permissions


class IsAuthor(permissions.BasePermission):
  def has_permission(self, request, view):
    if request.user.is_authenticated:
      return True
      # Double check if this is needed:
    return False


  def has_object_permission(self, request, view, obj):
      # if request.method in permissions.SAFE_METHODS:
      #   return True

      return request.user == obj.user
    



