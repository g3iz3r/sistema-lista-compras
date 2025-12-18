from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Categoria(models.Model):
    nome = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Categoria de Produto"
        verbose_name_plural = "Categorias de Produtos"

    def __str__(self):
        return self.nome


class Produto(models.Model):
    nome = models.CharField(max_length=100, unique=True)

    categoria = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, related_name='produtos')

    class Meta:
        verbose_name = "Produto do Catálogo"
        verbose_name_plural = "Produtos do Catálogo"

    def __str__(self):
        return f"{self.nome} ({self.categoria.nome})"


class ItemLista(models.Model):
    usuario = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='lista_de_compras')

    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)

    quantidade = models.PositiveIntegerField(default=1)

    comprado = models.BooleanField(default=False)

    criado_em = models.DateTimeField(auto_now_add=True)

    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Item da Lista"
        verbose_name_plural = "Itens da Lista"
        unique_together = ('usuario', 'produto')
        ordering = ['-criado_em']

    def __str__(self):
        status = "Comprado" if self.comprado else "Pendente"
        return f"[{status}] {self.produto.nome} (Qtd: {self.quantidade}) por {self.usuario.username}"
