# Generated by Django 5.0.4 on 2024-11-16 06:53

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Calender", "0002_remove_holiday_date_remove_holiday_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="holiday",
            name="date",
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="holiday",
            name="name",
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
    ]