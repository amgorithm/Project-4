from rest_framework import permissions

class IsAuthor(permissions.BasePermission):
  def has_permission(self, request, view):
    if request.user.is_authenticated:
      return True
   
    return False


  def has_object_permission(self, request, view, obj):

      return request.user == obj.user
    


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS



