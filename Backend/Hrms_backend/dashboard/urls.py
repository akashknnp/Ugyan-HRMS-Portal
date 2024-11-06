from django.urls import path
from . import views  

urlpatterns = [
    path('clockInOut/create/', views.create_clock_in_out, name='create_clock_in_out'),
    path('clockInOut/max_attempts/', views.get_records_with_max_attempts, name='get_records_with_max_attempts')
]
