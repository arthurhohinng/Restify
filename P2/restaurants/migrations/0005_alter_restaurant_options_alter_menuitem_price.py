# Generated by Django 4.0.3 on 2022-03-13 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0004_comment_alter_blogpost_title_delete_comments'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='restaurant',
            options={'ordering': ['followers']},
        ),
        migrations.AlterField(
            model_name='menuitem',
            name='price',
            field=models.FloatField(default=0.0),
        ),
    ]
