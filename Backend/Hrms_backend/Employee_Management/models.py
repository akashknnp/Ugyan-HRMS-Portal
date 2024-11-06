from django.db import models


class Employee(models.Model):
    id=models.AutoField(max_length=10,primary_key=True)
    E_id=models.CharField(max_length=10)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.PositiveBigIntegerField(max_length=15)
    age=models.PositiveBigIntegerField(max_length=3)
    gender=models.CharField(max_length=2)
    Designation = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    date_joined = models.DateField(auto_now_add=True)
    is_emp=models.BooleanField(default=False)
    is_HR=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    
    
        