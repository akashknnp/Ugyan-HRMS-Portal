from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.utils import timezone
from .models import ClockInOut
from datetime import timedelta
from django.utils.timezone import now
from .models import MonthlyTarget
from django.views.decorators.csrf import csrf_exempt
import json

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
    
    # Set login time and shift end time
    clock_entry.login_time = timezone.now()
    clock_entry.shift_end_time = clock_entry.login_time + timedelta(hours=8)
    clock_entry.login_attempts += 1
    clock_entry.logout_time = None  # Explicitly clear logout_time in case it was set accidentally
    clock_entry.save()

    return JsonResponse({
        "status": "success",
        "message": "Clock-in successful.",
        "login_time": clock_entry.login_time,
        "shift_end_time": clock_entry.shift_end_time
    })

def clock_out_view(request):
    employee_id = request.GET.get('id')
    clock_entry = get_object_or_404(ClockInOut, E_id=employee_id, date=timezone.now().date())

    # Check if the employee has already checked out today
    if clock_entry.logout_time and clock_entry.logout_time.date() == timezone.now().date():
        return JsonResponse({"status": "failed", "message": "Already checked out today."})

    # Check if the employee has clocked in
    if not clock_entry.login_time or clock_entry.login_time.date() != timezone.now().date():
        return JsonResponse({"status": "failed", "message": "Cannot check out without clocking in first."})

    # Ensure the 8-hour shift timer has ended
    now = timezone.now()
    if now < clock_entry.shift_end_time:
        remaining_time = clock_entry.shift_end_time - now
        hours, remainder = divmod(remaining_time.total_seconds(), 3600)
        minutes, seconds = divmod(remainder, 60)
        remaining_time_str = f"{int(hours)}:{int(minutes):02}:{int(seconds):02}"
        return JsonResponse({
            "status": "failed",
            "message": f"You cannot clock out until the shift ends. Remaining time: {remaining_time_str}"
        })

    # Record the current time as the logout time
    clock_entry.logout_time = now
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

def timer_view(request):
    employee_id = request.GET.get('id')
    
    # Fetch today's clock entry for the employee
    clock_entry = get_object_or_404(ClockInOut, E_id=employee_id, date=timezone.now().date())
    
    # Check if the employee has clocked in
    if not clock_entry.login_time:
        return JsonResponse({"status": "failed", "message": "Clock-in not recorded for today."})
    
    # Calculate remaining time
    now = timezone.now()
    if clock_entry.shift_end_time and now < clock_entry.shift_end_time:
        remaining_time = clock_entry.shift_end_time - now
        hours, remainder = divmod(remaining_time.total_seconds(), 3600)
        minutes, seconds = divmod(remainder, 60)
        remaining_time_str = f"{int(hours)}:{int(minutes):02}:{int(seconds):02}"
    else:
        remaining_time_str = "Shift complete!"

    return JsonResponse({
        "status": "success",
        "remaining_time": remaining_time_str,
        "shift_end_time": clock_entry.shift_end_time
    })

def track_monthly_targets(request):
   
    emp_id = request.GET.get('emp_id') 

    if not emp_id:
        return JsonResponse({
            "status": "error",
            "message": "Employee ID (emp_id) is required."
        })

    try:
        # Fetch all targets for the given employee ID
        employee_targets = MonthlyTarget.objects.filter(emp_id=emp_id)

        if not employee_targets.exists():
            return JsonResponse({
                "status": "error",
                "message": f"No targets found for employee ID: {emp_id}."
            })

        # Counters for status tracking
        status_summary = {"Pending": 0, "Achieved": 0, "Exceeded": 0}
        updated_targets = []

        for target in employee_targets:
            # Calculate the difference
            target.difference = target.actual_value - target.target_value

            if target.difference > 0:
                target.status = "Pending"
            elif target.difference == 0:
                target.status = "Achieved"
            else: 
                target.status = "Exceeded"

            # Save the updated target
            target.updated_at = now()
            target.save()

            # Update status counters
            status_summary[target.status] += 1

            # Collect updated target info
            updated_targets.append({
                "target_id": target.target_id,
                "emp_id": target.emp_id,
                "month": target.month,
                "year": target.year,
                "difference": target.difference,
                "status": target.status,
            })

        return JsonResponse({
            "status": "success",
            "message": f"Monthly targets tracked successfully for employee ID: {emp_id}.",
            "status_summary": status_summary,
            "updated_targets": updated_targets,
        })

    except Exception as e:
        # Handle unexpected errors
        return JsonResponse({
            "status": "error",
            "message": f"An unexpected error occurred: {str(e)}"
        })

@csrf_exempt
def add_monthly_target(request):
    if request.method == "POST":
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body.decode("utf-8"))
            
            # Retrieve fields with default values for missing data
            month = data.get("month")
            year = data.get("year")
            target_value = data.get("target_value")
            actual_value = data.get("actual_value", 0.0) 
            status = data.get("status")
            emp_id = data.get("emp_id")

            # Check for required fields
            if not month or year is None or target_value is None or not status or not emp_id:
                return JsonResponse({
                    "status": "error",
                    "message": "Fields (month, year, target_value, status, emp_id) are required and cannot be null."
                })

            # Ensure year and target_value are integers
            year = int(year)
            target_value = float(target_value)

            # Calculate the difference if not explicitly provided
            difference = data.get("difference", target_value - actual_value)

            # Create the MonthlyTarget record
            monthly_target = MonthlyTarget.objects.create(
                month=month,
                year=year,
                target_value=target_value,
                actual_value=actual_value,
                difference=difference,
                status=status,
                emp_id=emp_id
            )

            return JsonResponse({
                "status": "success",
                "message": "Monthly target added successfully.",
                "target_id": monthly_target.target_id
            })
        except ValueError as ve:
            return JsonResponse({"status": "error", "message": f"Invalid data type: {str(ve)}"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": f"An error occurred: {str(e)}"})
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method. Use POST."})

@csrf_exempt
def update_monthly_target(request):
    if request.method == "POST":
        try:
            # Parse JSON data
            data = json.loads(request.body.decode("utf-8"))

            # Extract target_id
            target_id = data.get("target_id")
            if not target_id:
                return JsonResponse({"status": "error", "message": "Field 'target_id' is required."})

            # Get the existing record
            monthly_target = MonthlyTarget.objects.filter(target_id=target_id).first()
            if not monthly_target:
                return JsonResponse({"status": "error", "message": f"Target with ID {target_id} does not exist."})

            # Update fields if provided
            if "month" in data:
                monthly_target.month = data["month"]
            if "year" in data:
                monthly_target.year = int(data["year"])
            if "target_value" in data:
                monthly_target.target_value = float(data["target_value"])
            if "actual_value" in data:
                monthly_target.actual_value = float(data["actual_value"])
            if "difference" in data:
                monthly_target.difference = float(data["difference"])
            else:
                # Calculate difference automatically if not provided
                monthly_target.difference = monthly_target.target_value - monthly_target.actual_value
            if "status" in data:
                monthly_target.status = data["status"]
            if "emp_id" in data:
                monthly_target.emp_id = data["emp_id"]

            # Save the updated record
            monthly_target.save()

            return JsonResponse({
                "status": "success",
                "message": "Monthly target updated successfully.",
                "updated_target_id": monthly_target.target_id
            })
        except ValueError as ve:
            return JsonResponse({"status": "error", "message": f"Invalid data type: {str(ve)}"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": f"An unexpected error occurred: {str(e)}"})
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method. Use POST."})
