# Generated by Django 4.2.16 on 2024-11-08 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_clockinout_reminder_3_min_clockinout_reminder_5_min'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clockinout',
            old_name='reminder_3_min',
            new_name='reminder_3_min_sent',
        ),
        migrations.RenameField(
            model_name='clockinout',
            old_name='reminder_5_min',
            new_name='reminder_5_min_sent',
        ),
        migrations.AlterField(
            model_name='clockinout',
            name='login_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='clockinout',
            unique_together={('E_id', 'date')},
        ),
    ]
