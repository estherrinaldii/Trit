const galho = document.querySelector('#galho');

let valorAtual = document.querySelector('#valorAtual');
let valorTotal = document.querySelector('#valorTotal');

valorAtual = valorAtual.textContent;
valorTotal = valorTotal.textContent;

valorAtual = valorAtual.replace(',','.');
valorTotal = valorTotal.replace(',','.');

valorAtual = Number(valorAtual);
valorTotal = Number(valorTotal);

let porcentagem = (valorAtual * 100) / valorTotal;

if(porcentagem >= 75)
{
    galho.setAttribute('src', 'img/galho/galho-f1.png');
}
else
{
    if(porcentagem < 75 && porcentagem >= 50)
    {
        galho.setAttribute('src', 'img/galho/galho-f2.png');
    }
    else
    {
        if(porcentagem < 50 && porcentagem >= 25)
        {
            galho.setAttribute('src', 'img/galho/galho-f3.png');
        }
        else
        {
            if(porcentagem < 25 && porcentagem > 0)
            {
                galho.setAttribute('src', 'img/galho/galho-f4.png');
            }
            else
            {
                galho.setAttribute('src', 'img/galho/galho-f5.png');
            }
        }
    }
}

const body = document.querySelector('body');
const btnNovaSaida = document.querySelector('#novaSaida');

btnNovaSaida.addEventListener('click', function(e){
    e.preventDefault();

    const bloqueio = document.createElement('div');
    bloqueio.classList.add('bloqueio');

    const areaNovaSaida = document.createElement('div');
    areaNovaSaida.classList.add('popup');

    const areaTitulo = document.createElement('div');
    areaTitulo.classList.add('areaTitulo');

    const tituloNovaSaida = document.createElement('p');
    tituloNovaSaida.classList.add('titulo');
    tituloNovaSaida.classList.add('tituloPopup');
    tituloNovaSaida.textContent = 'Nova saída';

    btnSair = botaoSair();

    const opcoesSaida = document.createElement('div');
    opcoesSaida.classList.add('opcoesSaida');

    const btnDiario = document.createElement('button');
    btnDiario.textContent = 'Diária';

    const btnFixo = document.createElement('button');
    btnFixo.textContent = 'Fixa';

    const btnParcelado = document.createElement('button');
    btnParcelado.textContent = 'Parcelada';

    areaTitulo.append(tituloNovaSaida, btnSair);

    opcoesSaida.append(btnDiario, btnFixo, btnParcelado);

    areaNovaSaida.append(areaTitulo, opcoesSaida);

    bloqueio.appendChild(areaNovaSaida)

    body.append(bloqueio);

    btnSair.addEventListener('click', function(e){
        e.preventDefault();

        areaNovaSaida.remove();
        bloqueio.remove();
    })

    btnDiario.addEventListener('click', function(e){
        e.preventDefault();

        opcoesSaida.remove();

        // const areaOpcaoCategorias = document.createElement('div');
        // areaOpcaoCategorias.classList.add('areaDigitar');

        // const labelOpcaoCategorias = document.createElement('p');
        // labelOpcaoCategorias.textContent = 'Categoria';

        // const opcaoCategorias = document.createElement('select');

        // const padrao = document.createElement('option');
        // padrao.textContent = '- Selecione uma categoria -';

        // const addCategoria = document.createElement('option');
        // addCategoria.textContent = 'Nova categoria';

        // const iconAddCategoria = document.createElement('p');
        // iconAddCategoria.textContent = '+'
        // iconAddCategoria.classList.add('iconAddCategoria');

        // addCategoria.prepend(iconAddCategoria);

        // opcaoCategorias.append(padrao, addCategoria);

        // areaOpcaoCategorias.append(labelOpcaoCategorias, opcaoCategorias);

        // areaNovaSaida.append(areaOpcaoCategorias);
    })
    
})

const areaControlados = document.querySelector('#areaControlados');

const valorTotalControlados = document.querySelectorAll('#valorTotalControlado');
const valorAtualControlados = document.querySelectorAll('#valorAtualControlado');
const barraProgresso = document.querySelectorAll('progress');
const moeda = document.querySelectorAll('#valorAtualControladoMoeda');

for (let i = 0; i < valorTotalControlados.length; i++) {
    let totalControlado = valorTotalControlados[i];
    let atualControlado = valorAtualControlados[i];

    atualControlado = atualControlado.textContent;
    totalControlado = totalControlado.textContent;

    atualControlado = atualControlado.replace(',','.');
    totalControlado = totalControlado.replace(',','.');

    atualControlado = Number(atualControlado);
    totalControlado = Number(totalControlado);

    let progresso = (atualControlado * 100) / totalControlado;
        
    if(progresso <= 100)
    {
        barraProgresso[i].setAttribute('value', progresso);
    }
    else
    {
        barraProgresso[i].setAttribute('value', 100);
        valorAtualControlados[i].style.color = 'rgb(255, 85, 85)';
        moeda[i].style.color = 'rgb(255, 85, 85)';
    }
}

function botaoSair(){

    const btnSair = document.createElement('button');
    btnSair.classList.add('btnSair');

    const imgSair = document.createElement('img');
    imgSair.src = 'img/sair.png';
    imgSair.alt = 'icone sair';
    imgSair.classList.add('imgSair');

    btnSair.appendChild(imgSair);

    return btnSair;
}