# accounts/urls.py

from django.urls import path, include
from . import views # Importamos as views de accounts

urlpatterns = [
    path('', include('django.contrib.auth.urls')), 
    
    path('registro/', views.registro_usuario, name='registro'), 
]