from django.urls import path
from . import views

urlpatterns = [
    path('clock-in/', views.clock_in_view, name='clock_in'),
    path('clock-out/', views.clock_out_view, name='clock_out'),
    path('reset-attempts/', views.reset_login_attempts_view, name='reset_login_attempts'),
]
