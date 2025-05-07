from django import forms
from django.core.validators import RegexValidator
from .models import User

class UserForm(forms.ModelForm):
    cep = forms.CharField(
        max_length=9,
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': '12345-678',
            'maxlength': '9',
        }),
        validators=[
            RegexValidator(
                regex=r'^\d{5}-\d{3}$',
                message='O CEP deve estar no formato 12345-678.'
            )
        ]
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'cep']
        widgets = {
            'username': forms.TextInput(attrs={'placeholder': 'Digite seu nome de usuário'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Digite seu email'}),
            'password': forms.PasswordInput(attrs={'placeholder': 'Digite sua senha'}),
        }