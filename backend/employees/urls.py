# urls.py
from django.urls import path
from .views import  attendance_list_create
from . import views

urlpatterns = [
    path('', views.EmployeeList.as_view(), name='employee-list'),
    path('attendance/', attendance_list_create, name='attendance-list-create'),
]
