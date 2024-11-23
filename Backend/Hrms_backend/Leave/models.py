from django.db import models

class LeaveRequest(models.Model):
    LEAVE_TYPES = [
        ('CASUAL', 'Casual Leave'),
        ('SICK', 'Sick Leave'),
        ('PAID', 'Paid Leave'),
        ('PATERNITY', 'Paternity Leave'),
        ('MATERNITY', 'Maternity Leave'),
        ('SABBATICAL', 'Sabbatical Leave'),
    ]

    leave_type = models.CharField(
        max_length=20,
        choices=LEAVE_TYPES,
        default='CASUAL',
        verbose_name="Leave Type"
    )
    start_date = models.DateField(verbose_name="Start Date")
    end_date = models.DateField(verbose_name="End Date")
    email = models.EmailField(verbose_name="Email ID")
    reason = models.TextField(verbose_name="Reason for Leave")

    STATUS = [
        ('Pending','Pending'),
        ('Approved','Approved'),
        ('Denied','Denied')
    ]

    status = models.CharField(
        max_length =20,
        default="Pending",
        choices = STATUS,
        verbose_name = "Status"
        )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")