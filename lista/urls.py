from django.urls import path
from . import views

urlpatterns = [
    path('', views.listaCompras, name='lista-compras'),
    path('registro/', views.registro_usuario, name='registro'),
]
