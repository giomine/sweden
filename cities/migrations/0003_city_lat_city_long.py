# Generated by Django 4.2 on 2023-04-20 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0002_city_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='lat',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='city',
            name='long',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
