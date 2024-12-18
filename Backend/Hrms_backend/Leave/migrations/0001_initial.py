# Generated by Django 5.0.4 on 2024-11-21 06:35

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="LeaveRequest",
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
                (
                    "leave_type",
                    models.CharField(
                        choices=[
                            ("CASUAL", "Casual Leave"),
                            ("SICK", "Sick Leave"),
                            ("PAID", "Paid Leave"),
                            ("PATERNITY", "Paternity Leave"),
                            ("MATERNITY", "Maternity Leave"),
                            ("SABBATICAL", "Sabbatical Leave"),
                        ],
                        default="CASUAL",
                        max_length=20,
                        verbose_name="Leave Type",
                    ),
                ),
                ("start_date", models.DateField(verbose_name="Start Date")),
                ("end_date", models.DateField(verbose_name="End Date")),
                ("email", models.EmailField(max_length=254, verbose_name="Email ID")),
                ("reason", models.TextField(verbose_name="Reason for Leave")),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("Approved", "Approved"),
                            ("Denied", "Denied"),
                        ],
                        default="Pending",
                        max_length=20,
                        verbose_name="Status",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Updated At"),
                ),
            ],
        ),
    ]
