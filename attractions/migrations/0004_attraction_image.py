# Generated by Django 4.2 on 2023-04-21 13:46

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attractions', '0003_attraction_lat_attraction_long'),
    ]

    operations = [
        migrations.AddField(
            model_name='attraction',
            name='image',
            field=models.URLField(default=1, validators=[django.core.validators.URLValidator()]),
            preserve_default=False,
        ),
    ]