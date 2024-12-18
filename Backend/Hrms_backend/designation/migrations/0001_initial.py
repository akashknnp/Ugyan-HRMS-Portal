# Generated by Django 5.0.4 on 2024-12-11 06:29

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Floor_Manager",
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
                ("E_id", models.CharField(max_length=10)),
                ("Designation", models.CharField(max_length=100)),
                ("report_to", models.CharField(max_length=10)),
                ("email", models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Vertical_Manager",
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
                ("E_id", models.CharField(max_length=10)),
                ("Designation", models.CharField(max_length=100)),
                ("report_to", models.CharField(max_length=10)),
                ("email", models.EmailField(max_length=254, unique=True)),
            ],
        ),
    ]
