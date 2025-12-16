from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Categoria, Produto, ItemLista

class ItemListaAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'produto', 'quantidade', 'comprado')
    list_filter = ('usuario', 'comprado', 'produto__categoria')
    search_fields = ('produto__nome', 'usuario__username')

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria')
    list_filter = ('categoria',)
    search_fields = ('nome',)


admin.site.register(Categoria)
admin.site.register(Produto, ProdutoAdmin)
admin.site.register(ItemLista, ItemListaAdmin)