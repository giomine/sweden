from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class City(models.Model):
    region = models.ForeignKey(
        'regions.Region',
        on_delete=models.CASCADE,
        related_name='cities'
    )

    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='cities'
    )
    
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200)
    image = models.URLField(validators=[URLValidator()])
    
    lat = models.FloatField()
    long = models.FloatField()


    def __str__(self):
        return f'{self.name}'