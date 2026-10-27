import { erro, formataInputValor, botaoSair, avisoSair, obrigatorioIcon } from "./funcoes.js";

const abrirInsignias = document.querySelectorAll('.tituloInsignias');

if(abrirInsignias)
{
    for (let i = 0; i < abrirInsignias.length; i++) {
        const btnAbrirInsignias = abrirInsignias[i];

        btnAbrirInsignias.addEventListener('click', function(e){
        e.preventDefault();

            const qualPagina = btnAbrirInsignias.querySelector('p').textContent;
            localStorage.setItem('qualPagina', qualPagina);
        
            window.location.href = "http://localhost/Trit/trit/insignias.html";
        })
    }
}

const desafios = document.querySelectorAll('.desafio');
console.log(desafios)

if(desafios)
{
    for (let i = 0; i < desafios.length; i++) {
        const checkbox = desafios[i];

        checkbox.addEventListener('click', function(e){
            e.preventDefault();

            if(!checkbox.classList.contains('concluido'))
            {
                checkbox.classList.add('concluido');
            }
            else
            {
                checkbox.classList.remove('concluido');
            }
        })
    }
}

const btnVoltar = document.querySelector('.btnVoltar')

if(btnVoltar)
{
    btnVoltar.addEventListener('click', function(e){
        e.preventDefault();
        
        window.location.href = "http://localhost/Trit/trit/conta.html";
    })    
}

const tituloExibir = document.querySelector('.areaTituloExibir p');

if(tituloExibir)
{
    tituloExibir.textContent = localStorage.getItem('qualPagina');
    const exibirInsignias = document.querySelector('section');

    let qtdRepeticao = 0;
    let tipoInsignias = '';

    if(tituloExibir.textContent == 'Metas alcançadas')
    {
        qtdRepeticao = 5;
        tipoInsignias = 'metas';
    }
    else
    {
        qtdRepeticao = 4;
        tipoInsignias = 'nivel';
    }

    for (let i = 0; i < qtdRepeticao; i++) {
        
        const insigniaExibir = document.createElement('div');
        insigniaExibir.classList.add('insigniaExibir');

        const imgInsignia = document.createElement('img');
        imgInsignia.src = 'img/insignias/' + tipoInsignias + '-' + i + '.svg';

        const nomeInsignia = document.createElement('p');
        nomeInsignia.textContent = 'Alcançar x metas';

        insigniaExibir.append(imgInsignia, nomeInsignia);
        exibirInsignias.appendChild(insigniaExibir);
        
    }
}