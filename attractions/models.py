from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Attraction(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    
    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='attractions'
    )
    city = models.ForeignKey(
        'cities.City',
        on_delete=models.CASCADE,
        related_name='attractions'
    )
    
    lat = models.FloatField()
    long = models.FloatField()
    image = models.URLField(validators=[URLValidator()])

    def __str__(self):
        return f'{self.name} - {self.city}'