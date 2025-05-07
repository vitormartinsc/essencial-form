from django.db import models
from django.core.validators import RegexValidator

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    cep = models.CharField(
        max_length=9,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\d{5}-\d{3}$',
                message='O CEP deve estar no formato 12345-678.'
            )
        ]
    )  # Formato: 12345-678

    def __str__(self):
        return self.username