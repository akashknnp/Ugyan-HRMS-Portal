from django.urls import path
from . import views

urlpatterns = [
    path('employees/', views.employee_list, name='employee_list'),
    path('employees/<int:id>/', views.employee_detail, name='employee_detail'),
    path('employees/new/', views.employee_create, name='employee_create'),
    path('employees/<int:id>/edit/', views.employee_update, name='employee_update'),
    path('employees/<int:id>/delete/', views.employee_delete, name='employee_delete'),
]
