# Generated by Django 5.1.2 on 2024-11-04 09:59

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Employee",
            fields=[
                (
                    "id",
                    models.IntegerField(
                        max_length=10, primary_key=True, serialize=False
                    ),
                ),
                ("E_id", models.CharField(max_length=10)),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone_number", models.PositiveBigIntegerField(max_length=15)),
                ("age", models.PositiveBigIntegerField(max_length=5)),
                ("gender", models.CharField(max_length=2)),
                ("Designation", models.CharField(max_length=100)),
                ("department", models.CharField(max_length=100)),
                ("date_of_birth", models.DateField(blank=True, null=True)),
                ("date_joined", models.DateField(auto_now_add=True)),
                ("is_emp", models.BooleanField(default=True)),
                ("is_HR", models.BooleanField(default=True)),
                ("is_admin", models.BooleanField(default=True)),
            ],
        ),
    ]
