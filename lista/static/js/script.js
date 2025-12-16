const dadosProdutos = [
    {
        id: 'padaria',
        nome: 'Padaria',
        itens: [
            { nome: 'Pão Francês' }, { nome: 'Baguete' }, { nome: 'Pão de forma' },
            { nome: 'Pão de queijo' }, { nome: 'Biscoito de queijo' }
        ]
    },
    {
        id: 'limpeza',
        nome: 'Limpeza',
        itens: [
            { nome: 'Desinfetante' }, { nome: 'Sabão em pó' }, { nome: 'Amaciante' },
            { nome: 'Sapólio' }, { nome: 'Detergente' }
        ]
    },
    {
        id: 'hortifruti',
        nome: 'Hortifruti',
        itens: [
            { nome: 'Maçã' }, { nome: 'Alface' }, { nome: 'Acelga' },
            { nome: 'Pera' }, { nome: 'Tomate' }
        ]
    },
    {
        id: 'beleza',
        nome: 'Beleza',
        itens: [
            { nome: 'Shampoo' }, { nome: 'Condicionador' }, { nome: 'Creme de pentear' },
            { nome: 'Perfume' }, { nome: 'Gel' }
        ]
    },
    {
        id: 'frios',
        nome: 'Frios',
        itens: [
            { nome: 'Queijo' }, { nome: 'Presunto' }, { nome: 'Mortadela' },
            { nome: 'Carne' }, { nome: 'Frango' }
        ]
    }
];

let meuCarrinho = [

];

const categoriasContainer = document.getElementById('categorias-container');
const itensContainer = document.getElementById('itens-container');
const listaPendentesContainer = document.getElementById('ul-pendentes');
const listaCompradosContainer = document.querySelector('.ul-comprados');


function renderizarCategorias() {
    let htmlCategorias = '';
    dadosProdutos.forEach(categoria => {
        htmlCategorias += `
            <a href="#" class="list-group-item list-group-item-action list-group-item-warning" 
               id="btn-${categoria.id}" 
               data-categoria="${categoria.id}">
                ${categoria.nome}
            </a>`;
    });
    categoriasContainer.innerHTML = htmlCategorias;

    document.querySelectorAll('#categorias-container a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            exibirItens(this.getAttribute('data-categoria'));
        });
    });

    if (dadosProdutos.length > 0) exibirItens(dadosProdutos[0].id);
}

function exibirItens(categoriaId) {
    const categoriaSelecionada = dadosProdutos.find(cat => cat.id === categoriaId);
    if (!categoriaSelecionada) return;

    document.querySelectorAll('#categorias-container .list-group-item').forEach(btn => btn.classList.remove('active'));
    const btnAtivo = document.getElementById(`btn-${categoriaId}`);
    if (btnAtivo) btnAtivo.classList.add('active');

    const htmlItens = categoriaSelecionada.itens.map(item => {
        const estaNoCarrinho = meuCarrinho.some(c => c.nome === item.nome);
        const checado = estaNoCarrinho ? 'checked' : '';
        const checkboxId = `catalogo-${item.nome.replace(/\s+/g, '-')}`;

        return `
            <div class="box-item">
                <div class="custom-checkbox">
                    <input type="checkbox" id="${checkboxId}" 
                           class="catalogo-checkbox" 
                           data-nome="${item.nome}" 
                           data-categoria="${categoriaSelecionada.nome}"
                           ${checado}> 
                    <label for="${checkboxId}">${item.nome}</label>
                </div>
            </div>`;
    }).join('');

    itensContainer.innerHTML = htmlItens;
    adicionarEventosCatalogo();
}

function adicionarEventosCatalogo() {
    document.querySelectorAll('.catalogo-checkbox').forEach(check => {
        check.addEventListener('change', function () {
            const nome = this.getAttribute('data-nome');
            const cat = this.getAttribute('data-categoria');

            if (this.checked) {
                adicionarAoCarrinho(nome, cat);
            } else {
                removerDoCarrinho(nome);
            }
        });
    });
}


function adicionarAoCarrinho(nome, categoria) {
    const existe = meuCarrinho.some(item => item.nome === nome);
    if (!existe) {
        meuCarrinho.push({
            nome: nome,
            quantidade: 1,
            categoria: categoria,
            comprado: false
        });
        renderizarMinhasListas();
    }
}

function removerDoCarrinho(nome) {
    meuCarrinho = meuCarrinho.filter(item => item.nome !== nome);
    renderizarMinhasListas();
}

function renderizarMinhasListas() {
    listaPendentesContainer.innerHTML = '';
    listaCompradosContainer.innerHTML = '';

    meuCarrinho.forEach((item, index) => {
        const safeName = item.nome.replace(/\s+/g, '-');
        const checkboxId = `lista-${safeName}`;

        if (item.comprado === false) {
            const li = document.createElement('li');
            li.className = 'box-item row';
            li.innerHTML = `
                <div class="col-12">
                    <div class="custom-checkbox">
                        <input type="checkbox" id="${checkboxId}" class="acao-checkbox" data-nome="${item.nome}"> 
                        <label for="${checkboxId}">${item.nome}</label>
                    </div>
                </div>
                <div class="col-12 mt-2 d-flex justify-content-between align-items-center">
                    <span class="badge text-bg-warning">${item.categoria}</span>
                    
                    <div class="controles-qtd">
                        <button class="btn-qtd" onclick="mudarQuantidade('${item.nome}', -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-qtd" onclick="mudarQuantidade('${item.nome}', 1)">+</button>
                    </div>
                </div>
            `;
            listaPendentesContainer.appendChild(li);

        } else {
            const li = document.createElement('li');
            li.className = 'box-item row item-riscado';
            li.innerHTML = `
                <div class="col-12">
                    <div class="custom-checkbox">
                        <input type="checkbox" id="${checkboxId}" class="acao-checkbox" data-nome="${item.nome}" checked> 
                        <label for="${checkboxId}">${item.nome}</label>
                    </div>
                </div>
                <div class="col-12 mt-1">
                    <span class="badge text-bg-secondary">${item.categoria}</span>
                    <span class="ms-2 text-muted small">Qtd: ${item.quantidade}</span>
                </div>
            `;
            listaCompradosContainer.appendChild(li);
        }
    });

    adicionarEventosCheckListas();
}

function adicionarEventosCheckListas() {
    document.querySelectorAll('.acao-checkbox').forEach(check => {
        check.addEventListener('change', function () {
            const nomeItem = this.getAttribute('data-nome');
            alternarStatusComprado(nomeItem);
        });
    });
}

function alternarStatusComprado(nome) {
    const item = meuCarrinho.find(i => i.nome === nome);
    if (item) {
        item.comprado = !item.comprado;
        renderizarMinhasListas();
    }
}

window.mudarQuantidade = function (nome, delta) {
    const item = meuCarrinho.find(i => i.nome === nome);
    if (item) {
        const novaQtd = item.quantidade + delta;
        if (novaQtd > 0) {
            item.quantidade = novaQtd;
            renderizarMinhasListas();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCategorias();
    renderizarMinhasListas();
});