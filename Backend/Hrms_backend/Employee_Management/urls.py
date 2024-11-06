from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_employees, name='employee_list'),
    path('get_employee/', views.employee_detail, name='employee_detail'),
    path('add_employee/', views.create_employee, name='employee_create'),
    path('update/', views.update_employee_byId, name='employee_update'),
    path('delete/', views.delete_employee_byId, name='employee_delete'),
]
