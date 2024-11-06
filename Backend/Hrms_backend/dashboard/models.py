from django.db import models
from django.utils import timezone 

class ClockInOut(models.Model):
      E_id=models.AutoField(primary_key=True)
      login_time=models.DateTimeField(default=timezone.now)
      logout_time=models.DateTimeField(null=True,blank=True)
      date=models.DateField(default=timezone.now)
      login_attempts=models.PositiveIntegerField(default=0)
      reset_attempts=models.PositiveIntegerField(default=0)
