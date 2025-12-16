from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth import login
# Create your views here.
def listaCompras(request):
    return render(request, 'listas/lista.html')

def registro_usuario(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save() 
            login(request, user) 
            return redirect('home') 
    else:
        form = UserCreationForm()
        
    context = {'form': form}
    return render(request, 'registro.html', context)
