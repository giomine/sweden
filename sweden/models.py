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

    musts = models.ManyToManyField(
        'must_see.MustSee', 
        related_name='must_sees'
    )

    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='city'
    )


    def __str__(self):
        return f'{self.name}'