# Generated by Django 4.0.3 on 2022-03-16 02:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0007_abstractimage'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='abstractimage',
            options={'ordering': ['restaurant']},
        ),
    ]
