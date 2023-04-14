from django.db import models

# Create your models here.
class Region(models.Model):
    # city = models.ForeignKey(
    #     'sweden.City',
    #     on_delete=models.CASCADE,
    #     related_name='regions'
    # )
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    