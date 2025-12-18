from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.listaCompras, name='lista-compras'),
    path('adicionar/', views.adicionar_item, name='adicionar-item'),
    path('remover/<int:item_id>/', views.remover_item, name='remover-item'),
    path('atualizar-checkbox/<int:item_id>/',
         views.atualizar_checkbox, name='atualizar-checkbox'),
    path('atualizar-quantidade/<int:item_id>/',
         views.atualizar_quantidade, name='atualizar-quantidade'),
    path('accounts/', include('django.contrib.auth.urls')),
]
