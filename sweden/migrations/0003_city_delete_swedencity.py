# Generated by Django 4.2 on 2023-04-14 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sweden', '0002_rename_sweden_swedencity'),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=200)),
                ('region', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='SwedenCity',
        ),
    ]
