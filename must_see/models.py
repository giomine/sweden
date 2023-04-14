from django.db import models

# Create your models here.
class MustSee(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    # in_cities = models.ManyToManyField('sweden.City', related_name='must_sees')

    def __str__(self):
        return self.name