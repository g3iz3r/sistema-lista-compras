from django.contrib import admin
from .models import Categoria, Produto, ItemLista


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome',)


@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria')
    list_filter = ('categoria',)
    search_fields = ('nome',)


@admin.register(ItemLista)
class ItemListaAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'produto', 'quantidade',
                    'comprado', 'criado_em')
    list_filter = ('usuario', 'comprado', 'criado_em')
    search_fields = ('usuario__username', 'produto__nome')
    readonly_fields = ('criado_em', 'atualizado_em')
