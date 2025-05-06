from django.contrib import admin
from .models import User

# Registra o modelo User no Django Admin
admin.site.register(User)
