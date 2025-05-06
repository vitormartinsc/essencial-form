from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from users.models import User
from django.contrib.auth.hashers import make_password
import logging

# Configura o logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        logger.info(f"Dados recebidos: {data}")
        try:
            user = User.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password'])
            )
            logger.info(f"Usuário criado: {user}")
            return JsonResponse({'message': 'Usuário registrado com sucesso!'}, status=201)
        except Exception as e:
            logger.error(f"Erro ao criar usuário: {e}")
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Método não permitido'}, status=405)