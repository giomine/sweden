from django.db import models

# Create your models here.
class City(models.Model):
    region = models.ForeignKey(
        'regions.Region',
        on_delete=models.CASCADE,
        related_name='region'
    )
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200)


    def __str__(self):
        return f'{self.name}'