import { botaoSair } from "./js/funcoes.js";

const local = document.getElementById('teste');
let btnSair = botaoSair();

function areaPopupEditar(local){
    const popup = document.createElement('div');
    popup.classList.add('popup');

        const areaTitulo = document.createElement('div');
        areaTitulo.classList.add('areaTitulo');

            const tituloPopup = document.createElement('h1');
            tituloPopup.classList.add('titulo');
            tituloPopup.classList.add('tituloPopup');
            tituloPopup.textContent = 'Alimentação';
        areaTitulo.appendChild(tituloPopup);
        areaTitulo.appendChild(btnSair);

        const areaValor = document.createElement('div');
        areaValor.classList.add('divAlinhamento');
            const areaValorAtual = document.createElement('div');
            areaValorAtual.classList.add('areaDigitar');

                const labelValorAtual = document.createElement('label');
                labelValorAtual.textContent = 'Valor:'

                const inputValorAtual = document.createElement('input');
                inputValorAtual.type = 'number';
                inputValorAtual.classList.add('recuoPopup');
                inputValorAtual.classList.add('inputMoeda');

                    let moeda = document.createElement('p');
                    moeda.textContent = 'R$';
                    moeda.classList.add('moeda');
                inputValorAtual.appendChild(moeda);
            areaValorAtual.appendChild(labelValorAtual);
            areaValorAtual.appendChild(inputValorAtual);


            const areaValorLimite = document.createElement('div');
            areaValorLimite.classList.add('areaDigitar');

                const labelValorLimite = document.createElement('label');
                labelValorLimite.textContent = 'Valor Limite:'

                const inputValorLimite = document.createElement('input');
                inputValorLimite.type = 'number';
                inputValorLimite.classList.add('recuoPopup');
                inputValorLimite.classList.add('inputMoeda');

                    moeda = document.createElement('p');
                    moeda.textContent = 'R$';
                    moeda.classList.add('moeda');
                inputValorLimite.appendChild(moeda);
            areaValorLimite.appendChild(labelValorLimite);
            areaValorLimite.appendChild(inputValorLimite);
        
        areaValor.appendChild(areaValorAtual);
        areaValor.appendChild(areaValorLimite);

        const areaBotoesPopup = document.createElement('div');
        areaBotoesPopup.classList.add('areaBotoesPopup');

            const btnSalvar = document.createElement('button');
            btnSalvar.classList.add('btnSalvar');
            btnSalvar.textContent = 'Salvar';

            const btnExcluir = document.createElement('button');
            btnExcluir.classList.add('btnExcluirElemento');
            btnExcluir.textContent = 'Excluir';
        areaBotoesPopup.appendChild(btnSalvar);
        areaBotoesPopup.appendChild(btnExcluir);
    
    popup.appendChild(areaTitulo);
    popup.appendChild(areaValor);
    popup.appendChild(areaBotoesPopup);

    local.appendChild(popup);
}

areaPopupEditar(local);