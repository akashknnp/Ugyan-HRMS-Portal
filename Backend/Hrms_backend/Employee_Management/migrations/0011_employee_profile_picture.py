# Generated by Django 5.0.4 on 2024-11-26 09:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Employee_Management", "0010_employee_password"),
    ]

    operations = [
        migrations.AddField(
            model_name="employee",
            name="profile_picture",
            field=models.ImageField(
                blank=True,
                default="employee_pics/default.png",
                null=True,
                upload_to="employee_pics/",
            ),
        ),
    ]
