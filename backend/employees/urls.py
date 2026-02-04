# urls.py
from django.urls import path
from .views import employee_list_create, attendance_list_create

urlpatterns = [
    path('employees/', employee_list_create, name='employee-list-create'),
    path('attendance/', attendance_list_create, name='attendance-list-create'),
]
