from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Employee
import json

# List all employees
def get_all_employees(request):
    employees = Employee.objects.all().values('id', 'E_id', 'first_name', 'last_name', 'email', 'phone_number', 'is_HR')
    return JsonResponse(list(employees), safe=False)

# View employee details
def employee_detail(request):
    E_id=request.GET.get('id')
    employee = get_object_or_404(Employee, E_id=E_id)
    employee_data = {
        'id': employee.id,
        'E_id': employee.E_id,
        'first_name': employee.first_name,
        'last_name': employee.last_name,
        'email': employee.email,
        'phone_number': employee.phone_number,
        'age': employee.age,
        'gender': employee.gender,
        'Designation': employee.Designation,
        'department': employee.department,
        'date_of_birth': employee.date_of_birth,
        'date_joined': employee.date_joined,
        'is_HR': employee.is_HR,
        'is_emp': employee.is_emp,
        'is_admin': employee.is_admin,
    }
    return JsonResponse(employee_data)

# Create a new employee
@csrf_exempt
def create_employee(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            employee = Employee.objects.create(
                E_id=data['E_id'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                phone_number=data['phone_number'],
                age=data['age'],
                gender=data['gender'],
                Designation=data['Designation'],
                department=data['department'],
                date_of_birth=data['date_of_birth'],
                is_HR=data.get('is_HR', False),
                is_emp=data.get('is_emp', False),
                is_admin=data.get('is_admin', False)
            )
            return JsonResponse({'id': employee.id, 'name':employee.first_name,'message': 'Employee created successfully'}, status=201)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {e.args[0]}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

# Update an existing employee
@csrf_exempt
def update_employee_byId(request):
    E_id=request.GET.get('id')
    employee = get_object_or_404(Employee,E_id=E_id)
    
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            employee.E_id = data.get('E_id', employee.E_id)
            employee.first_name = data.get('first_name', employee.first_name)
            employee.last_name = data.get('last_name', employee.last_name)
            employee.email = data.get('email', employee.email)
            employee.phone_number = data.get('phone_number', employee.phone_number)
            employee.age = data.get('age', employee.age)
            employee.gender = data.get('gender', employee.gender)
            employee.Designation = data.get('Designation', employee.Designation)
            employee.department = data.get('department', employee.department)
            employee.date_of_birth = data.get('date_of_birth', employee.date_of_birth)
            employee.is_HR = data.get('is_HR', employee.is_HR)
            employee.is_emp = data.get('is_emp', employee.is_emp)
            employee.is_admin = data.get('is_admin', employee.is_admin)
            employee.save()
            return JsonResponse({'id': employee.id, 'message': 'Employee updated successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

# Delete an employee
@csrf_exempt
def delete_employee_byId(request):
    if request.method == "DELETE":
        E_id=request.GET.get('id')
        try:
            employee = get_object_or_404(Employee, E_id=E_id)
            employee.delete()
            return JsonResponse({"deleted":employee.first_name,"message":"Deleted the emp successfully"},status=204)
        except Exception as e:
            return JsonResponse({"error":f'Raised exception {e}'})
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

