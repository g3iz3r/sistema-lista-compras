from django.shortcuts import render

# Create your views here.
def listaCompras(request):
    return render(request, 'listas/lista.html')
