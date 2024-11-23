# Generated by Django 5.0.4 on 2024-11-23 09:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Leave", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="LeaveBalance",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("E_id", models.CharField(max_length=20, unique=True)),
                ("total_sick_leave", models.FloatField(default=0)),
                ("total_casual_leave", models.FloatField(default=0)),
                ("taken_sick_leave", models.FloatField(default=0)),
                ("taken_casual_leave", models.FloatField(default=0)),
                ("difference_sick", models.FloatField(default=0)),
                ("difference_casual", models.FloatField(default=0)),
                ("others", models.FloatField(default=0)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]