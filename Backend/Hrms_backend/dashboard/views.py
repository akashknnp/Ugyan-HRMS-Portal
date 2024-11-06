from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.utils import timezone
import logging
from .models import ClockInOut

# Set up logging
logger = logging.getLogger(__name__)

def clock_in_view(request):
    employee_id = request.GET.get('id')
    
    # Get or create ClockInOut object
    clock_entry, created = ClockInOut.objects.get_or_create(
        E_id=employee_id,
        date=timezone.now().date()
    )
    
    # Check if already clocked in
    if not created and clock_entry.login_time.date() == timezone.now().date():
        return JsonResponse({"status": "failed", "message": "Already clocked in today."})
    
    # Set login time and save
    clock_entry.login_time = timezone.now()
    clock_entry.login_attempts += 1
    clock_entry.logout_time = None  # Explicitly clear logout_time in case it was set accidentally
    clock_entry.save()

    logger.info(f"Employee {employee_id} clocked in at {clock_entry.login_time}")

    return JsonResponse({"status": "success", "message": "Clock-in successful.", "login_time": clock_entry.login_time})

def clock_out_view(request):
    employee_id = request.GET.get('id')
    clock_entry = get_object_or_404(ClockInOut, E_id=employee_id, date=timezone.now().date())

    # Check if the employee has already checked out today
    if clock_entry.logout_time and clock_entry.logout_time.date() == timezone.now().date():
        return JsonResponse({"status": "failed", "message": "Already checked out today."})

    if not clock_entry.login_time or clock_entry.login_time.date() != timezone.now().date():
        return JsonResponse({"status": "failed", "message": "Cannot check out without clocking in first."})

    # Record the current time as the logout time
    clock_entry.logout_time = timezone.now()
    clock_entry.save()

    return JsonResponse({"status": "success", "message": "Check-out successful.", "logout_time": clock_entry.logout_time})

def reset_login_attempts_view(request):
    # Get or create a ClockInOut object for the specified employee ID
    clock_entry, created = ClockInOut.objects.get_or_create(
        E_id=request.GET.get('id'),
        date=timezone.now().date()
    )

    # Reset login attempts and increment reset attempts
    clock_entry.login_attempts = 0
    clock_entry.reset_attempts += 1
    clock_entry.save()

    return JsonResponse({"status": "success", "message": "Login attempts reset.", "reset_attempts": clock_entry.reset_attempts})
