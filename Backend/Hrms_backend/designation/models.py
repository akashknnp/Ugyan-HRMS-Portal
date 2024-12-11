from django.db import models

# Create your models here.
class Floor_Manager(models.Model):
    E_id=models.CharField(max_length=10)
    Designation = models.CharField(max_length=100)
    report_to=models.CharField(max_length=10)
    email=models.EmailField(unique=True)


class Vertical_Manager(models.Model):
    E_id=models.CharField(max_length=10)
    Designation = models.CharField(max_length=100)
    report_to=models.CharField(max_length=10)
    email=models.EmailField(unique=True)

# class Team_lead(models.Model):
#     E_id=models.CharField(max_length=10)
#     Designation = models.CharField(max_length=100)
#     report_to=models.CharField(max_length=10)
#     email=models.EmailField(unique=True)

# class ATL(models.Model):
#     E_id=models.CharField(max_length=10)
#     Designation = models.CharField(max_length=100)
#     report_to=models.CharField(max_length=10)
#     email=models.EmailField(unique=True)

