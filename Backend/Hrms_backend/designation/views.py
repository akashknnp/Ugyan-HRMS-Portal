
from django.shortcuts import render
from django.http import HttpResponse
from .models import Floor_Manager

def add_floor_manager(request):
    if request.method == "POST":
        E_id = request.POST.get('E_id')
        Designation = request.POST.get('Designation')
        report_to = request.POST.get('report_to')
        email = request.POST.get('email')
        
        # Create a new Floor_Manager instance
        floor_manager = Floor_Manager(
            E_id=E_id,
            Designation=Designation,
            report_to=report_to,
            email=email
        )
        
        # Save the instance to the database
        floor_manager.save()
        return HttpResponse("Floor Manager details added successfully!")
    
    return render(request, 'add_floor_manager.html')
