# Generated by Django 5.0.4 on 2024-11-14 07:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Employee_Management", "0006_delete_logindetails_alter_employee_phone_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="employee",
            name="phone_number",
            field=models.PositiveBigIntegerField(max_length=10),
        ),
    ]
