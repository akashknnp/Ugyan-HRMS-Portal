from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from .models import Employee

# List all employees
def employee_list(request):
    employees = Employee.objects.all().values('E_id', 'first_name', 'last_name', 'is_HR','email')
    return JsonResponse(list(employees), safe=False)

# View employee details
def employee_detail(request, id):
    employee = get_object_or_404(Employee, id=id)
    employee_data = {
        'id': employee.id,
        'first_name': employee.first_name,
        'last_name': employee.last_name,
        'is_HR': employee.is_HR,
    }
    return JsonResponse(employee_data)

# Create a new employee
def employee_create(request):
    if request.method == "POST":
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        is_active = request.POST.get('is_active', 'true') == 'true'  # Default to True

        employee = Employee.objects.create(first_name=first_name, last_name=last_name, is_active=is_active)
        return JsonResponse({'id': employee.id}, status=201)

# Update an existing employee
def employee_update(request, id):
    employee = get_object_or_404(Employee, id=id)
    
    if request.method == "POST":
        employee.first_name = request.POST.get('first_name', employee.first_name)
        employee.last_name = request.POST.get('last_name', employee.last_name)
        employee.is_active = request.POST.get('is_active', 'true') == 'true'  # Default to True
        employee.save()
        return JsonResponse({'id': employee.id})

# Delete an employee
def employee_delete(request, id):
    employee = get_object_or_404(Employee, id=id)
    
    if request.method == "DELETE":
        employee.delete()
        return HttpResponse(status=204)
