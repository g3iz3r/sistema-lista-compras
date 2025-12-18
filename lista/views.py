from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.http import JsonResponse
from .models import Categoria, Produto, ItemLista


def listaCompras(request):
    usuario = request.user
    itens = ItemLista.objects.filter(usuario=usuario).select_related(
        'produto', 'produto__categoria')
    categorias = Categoria.objects.all()

    context = {
        'itens': itens,
        'categorias': categorias,
    }
    return render(request, 'listas/lista.html', context)


def adicionar_item(request):
    if request.method == 'POST':
        produto_id = request.POST.get('produto_id')
        quantidade = int(request.POST.get('quantidade', 1))

        produto = get_object_or_404(Produto, id=produto_id)

        item, criado = ItemLista.objects.get_or_create(
            usuario=request.user,
            produto=produto,
            defaults={'quantidade': quantidade}
        )

        if not criado:
            item.quantidade = quantidade
            item.save()

        return redirect('lista-compras')

    produtos = Produto.objects.select_related('categoria')
    context = {'produtos': produtos}
    return render(request, 'listas/adicionar_item.html', context)

