# employees/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('employees/', views.EmployeeListCreateView.as_view(), name='employee-list'),
    path('employees/<int:pk>/', views.EmployeeRetrieveUpdateDeleteView.as_view(), name='employee-detail'),
]
