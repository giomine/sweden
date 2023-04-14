from django.db import models

# Create your models here.
class Fact(models.Model):
    city = models.ForeignKey(
        'sweden.City',
        on_delete=models.CASCADE,
        related_name='facts'
    )
    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='facts'
    )
    date_created = models.DateTimeField(auto_now_add=True)
    dialect = models.CharField(max_length=50)
    notes = models.TextField(max_length=500)

    def __str__(self):
        return f'{self.city}'