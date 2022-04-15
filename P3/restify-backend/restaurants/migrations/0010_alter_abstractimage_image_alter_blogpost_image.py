# Generated by Django 4.0.3 on 2022-04-14 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0009_alter_restaurant_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abstractimage',
            name='image',
            field=models.ImageField(upload_to='gallery/'),
        ),
        migrations.AlterField(
            model_name='blogpost',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='blogpost-images/'),
        ),
    ]