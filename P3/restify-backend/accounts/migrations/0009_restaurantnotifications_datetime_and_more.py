# Generated by Django 4.0.3 on 2022-03-15 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_restaurantnotifications_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurantnotifications',
            name='datetime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='usernotifications',
            name='datetime',
            field=models.DateTimeField(auto_now=True),
        ),
    ]