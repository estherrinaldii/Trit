if(sessionStorage['logado'] == null || sessionStorage['logado'] == ""){
    window.location.href = "http://localhost/trit/login.html";
}

import { erro, botaoSair, avisoSair, obrigatorioIcon, formataInputData, validaData } from "./funcoes.js";

const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio');
let btnSair = botaoSair();
let areaRight = 0;


const galho = document.querySelector('#galho');
function mudaFaseArvore(valorAtual, valorTotal){
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
}
let valorAtual = 0;
let valorTotal = 0;

fetch("http://localhost/trit/api/buscarDadosUsuario.php", {
method: "GET",
    credentials: "include",
})
.then(function (resposta) {
    if (!resposta.ok) {
    throw new Error("Erro HTTP: " + resposta.status);
    }
    return resposta.json();
})
.then(function (dadosJSON) {
    if (dadosJSON) {
            document.querySelector('#valorAtual').textContent = String(dadosJSON.usuario[1].Valor).replace('.',',');
            document.querySelector('#valorTotal').textContent = String(dadosJSON.usuario[0].Renda).replace('.',',');

            valorAtual = dadosJSON.usuario[1].Valor;
            valorTotal = dadosJSON.usuario[0].Renda;

            mudaFaseArvore(valorAtual, valorTotal);
    } else {
        window.location.href = "http://localhost/trit/login.html";
    }
})
.catch(function (error) {
    console.warn(error);
})
.finally(function () {
});

const body = document.querySelector('body');
const btnNovaSaida = document.querySelector('#novaSaida');
const btnNovaEntrada = document.querySelector('#novaEntrada');

const msgErro = document.createElement('p');
msgErro.classList.add('erro');

btnNovaSaida.addEventListener('click', function(e){
    e.preventDefault();
    criarAreaSaida();
})

btnNovaEntrada.addEventListener('click', function(e){
    e.preventDefault();

    const areaNovaEntrada = document.createElement('div');
    areaNovaEntrada.classList.add('popup');

    const areaTitulo = document.createElement('div');
    areaTitulo.classList.add('areaTitulo');

    const areaInfos = document.createElement('div');
    areaInfos.classList.add('infos');

    const tituloNovaEntrada = document.createElement('p');
    tituloNovaEntrada.textContent = 'Nova Entrada';
    tituloNovaEntrada.classList.add('titulo');
    tituloNovaEntrada.classList.add('tituloPopup');

    btnSair = botaoSair();

    areaTitulo.append(tituloNovaEntrada, btnSair);

    const areaNomeEntrada = document.createElement('div');
    areaNomeEntrada.classList.add('areaDigitar');

    const labelNomeEntrada = document.createElement('label');
    labelNomeEntrada.textContent = 'Nome:'

    const txtNomeEntrada = document.createElement('input');
    txtNomeEntrada.type = 'text';
    txtNomeEntrada.classList.add('recuoPopup');
    areaRight = obrigatorioIcon(txtNomeEntrada);

    areaNomeEntrada.append(labelNomeEntrada, areaRight);

    const divAlinhamento = document.createElement('div');
    divAlinhamento.classList.add('divAlinhamento');

    const areaDataEntrada = document.createElement('div');
    areaDataEntrada.classList.add('areaDigitar');

    const labelDataEntrada = document.createElement('label');
    labelDataEntrada.textContent = 'Data:'

    const txtDataEntrada = document.createElement('input');
    txtDataEntrada.type = 'text';
    txtDataEntrada.classList.add('recuoPopup');
    txtDataEntrada.inputMode = 'numeric';
    txtDataEntrada.value = 'dd/mm/aaaa';
    formataInputData(txtDataEntrada, null);
    areaRight = obrigatorioIcon(txtDataEntrada);
    areaDataEntrada.append(labelDataEntrada, areaRight);

    const areaValorEntrada = document.createElement('div');
    areaValorEntrada.classList.add('areaDigitar');

    const labelValorEntrada = document.createElement('label');
    labelValorEntrada.textContent = 'Valor:'

    const areaLeft = document.createElement('div');
    areaLeft.classList.add('areaLeft');

    const txtValorEntrada = document.createElement('input');
    txtValorEntrada.type = 'number';
    txtValorEntrada.classList.add('recuoPopup');
    txtValorEntrada.classList.add('inputMoeda');

    const moeda = document.createElement('p');
    moeda.textContent = 'R$';
    moeda.classList.add('moeda');

    areaLeft.append(txtValorEntrada, moeda);
    areaValorEntrada.append(labelValorEntrada, obrigatorioIcon(areaLeft));

    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.classList.add('btnSalvar');

    divAlinhamento.append(areaDataEntrada, areaValorEntrada);
    areaInfos.append(areaNomeEntrada, divAlinhamento);

    areaNovaEntrada.append(areaTitulo, areaInfos, btnSalvar);
    bloqueio.appendChild(areaNovaEntrada);
    body.appendChild(bloqueio);

    btnSair.addEventListener('click', function(e){
        e.preventDefault();

        areaNovaEntrada.remove();
        avisoSair(bloqueio);
    })

    btnSalvar.addEventListener('click', function(e){
        e.preventDefault();

        if(txtNomeEntrada.value == '')
        {
            erro(msgErro, txtNomeEntrada, 'Nome não foi informado!', areaInfos);
            return;
        }

        if(txtDataEntrada.value == '')
        {
            erro(msgErro, txtDataEntrada, 'Data não foi informada!', areaInfos);
            return;
        }

        if(txtValorEntrada.value == '')
        {
            erro(msgErro, txtValorEntrada, 'Valor não foi informado', areaInfos)
            return;
        }

        let valor = Number(txtValorEntrada.value);
        let dataEntrada = FormatarData(txtDataEntrada, txtDataEntrada, areaInfos);

        fetch("http://localhost/trit/api/criarEntrada.php", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "nome":txtNomeEntrada.value,
                "data":dataEntrada,
                "valor":valor
            }
        ),
        })
        .then(function (resposta) {
            if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
            }
            return resposta.json();
        })
        .then(function (dadosJSON) {
            if (dadosJSON) {
                areaNovaEntrada.remove();
                bloqueio.remove();

                let carteira = document.getElementById('valorAtual').textContent.replace(',','.');
                let carteiraTotal = document.getElementById('valorTotal').textContent.replace(',','.');
                carteira = Number(carteira);
                carteiraTotal = Number(carteiraTotal);

                carteira = carteira + valor;
                mudaFaseArvore(carteira, carteiraTotal);

                if(!String(carteira).includes('.'))
                {
                    carteira = carteira + ',00';
                }

                if(!String(carteiraTotal).includes('.'))
                {
                    carteiraTotal = carteiraTotal + ',00';
                }

                document.getElementById('valorAtual').textContent = String(carteira).replace('.',',');
            }
        })
        .catch(function (error) {
            console.warn(error);
        })
        .finally(function () {
        });
    })
})



const areaCategorias = document.querySelector('.areaCategorias');
let btnMais = document.createElement('button');
btnMais.textContent = 'Ver Mais';
btnMais.classList.add('verMais');


fetch("http://localhost/trit/api/listarCategorias.php", {
    method: "GET",
    credentials: "include",
})
.then(function (resposta) {
    if (!resposta.ok) {
        throw new Error("Erro HTTP: " + resposta.status);
    }
    return resposta.json();
})
.then(function (dadosJSON) {
    if (dadosJSON) {
        let indiceLimite = 4;
        if(dadosJSON.categorias.length > 4){
            areaCategorias.appendChild(btnMais);
                indiceLimite = 4;
                listarCategorias(indiceLimite, dadosJSON.categorias);
                btnMais.addEventListener('click', function(e){
                    e.preventDefault();
                    btnMais.remove();
                    indiceLimite = dadosJSON.categorias.length;
                    areaCategorias.textContent = '';
                    listarCategorias(indiceLimite, dadosJSON.categorias);

                    let btnMenos = document.createElement('button');
                    btnMenos.textContent = 'Ver Menos';
                    btnMenos.classList.add('verMais');
                    areaCategorias.appendChild(btnMenos);
                    
                    btnMenos.addEventListener('click', function(e){
                        e.preventDefault();
                        indiceLimite = 4;
                        areaCategorias.textContent = '';
                        listarCategorias(indiceLimite, dadosJSON.categorias);
                        btnMenos.remove();
                        areaCategorias.appendChild(btnMais);
                    })
                })
            }else{
                indiceLimite = dadosJSON.categorias.length;
                listarCategorias(indiceLimite, dadosJSON.categorias);
            }     
        }
    })
    .catch(function (error) {
        console.warn(error);
    })
    .finally(function () {
    });

function criarCategorias(local, txtTitulo, txtValorAtual, txtValorLimite){
    let valorAtualEx = String(txtValorAtual).replace('.',',');
    let valorLimiteEx = String(txtValorLimite).replace('.',',');

    valorAtualEx = procuraVirgula(valorAtualEx);
    valorLimiteEx = procuraVirgula(valorLimiteEx);
    
    const cardControlado = document.createElement('div');
    cardControlado.classList.add("card");
    cardControlado.classList.add("controlado");

        const infosControlado = document.createElement('div');
        infosControlado.classList.add("infosControlado");

            const tituloControlado = document.createElement('div');
            tituloControlado.classList.add("tituloControlado");
                const titulo = document.createElement('p');
                titulo.textContent = txtTitulo;
            tituloControlado.appendChild(titulo);

                const valorControlado = document.createElement('div');
                valorControlado.classList.add("valorControlado");
                    let caixa = document.createElement('div');
                        let moedaAtual = document.createElement('p');
                        moedaAtual.id = "valorAtualControladoMoeda";
                        moedaAtual.textContent = "R$";
                    caixa.appendChild(moedaAtual);

                        let textoAtual = document.createElement('p');
                        textoAtual.id = "valorAtualControlado";
                        textoAtual.textContent = valorAtualEx;
                    caixa.appendChild(textoAtual);
                valorControlado.appendChild(caixa);

                let texto = document.createElement('p');
                texto.textContent = "/";
                valorControlado.appendChild(texto);

                caixa = document.createElement('div');
                        let moedaLimite = document.createElement('p');
                        moedaLimite.textContent = "R$";
                    caixa.appendChild(moedaLimite);

                        let textoLimite = document.createElement('p');
                        textoLimite.id = "valorTotalControlado";
                        textoLimite.textContent = valorLimiteEx;
                    caixa.appendChild(textoLimite);
                valorControlado.appendChild(caixa);

            tituloControlado.appendChild(valorControlado);

            const barraProgresso = document.createElement('progress');
            barraProgresso.setAttribute('max', 100);
            let progresso = (Number(txtValorAtual) * 100) / Number(txtValorLimite);
            barraProgresso.setAttribute('value', progresso);
            
            if(progresso >= 35 && progresso < 65){
                barraProgresso.classList.add('leve');
            }else{
                if(progresso >= 65 && progresso < 100){
                    barraProgresso.classList.add('alto');
                }else{
                    if(progresso >= 100){
                        barraProgresso.classList.add('limite');
                        barraProgresso.setAttribute('value', 100);
                        textoAtual.style.color = 'rgb(255, 85, 85)';
                        moedaAtual.style.color = 'rgb(255, 85, 85)';
                    }
                }
            }

        infosControlado.appendChild(tituloControlado);
        infosControlado.appendChild(barraProgresso);

        const icone = document.createElement('img');
        icone.src = "img/seta.png";
        icone.addEventListener('click', function(e){
            e.preventDefault();
            console.log('clicou');
            body.appendChild(bloqueio);
            areaPopupEditar(bloqueio, txtTitulo, valorAtualEx, valorLimiteEx);
        })

    cardControlado.appendChild(infosControlado);
    cardControlado.appendChild(icone);
    
    local.prepend(cardControlado);
}

function alterarCarteira(txtValor){
    let carteira = document.getElementById('valorAtual').textContent.replace(',','.');
    let carteiraTotal = document.getElementById('valorTotal').textContent.replace(',','.');
    carteira = Number(carteira);
    carteiraTotal = Number(carteiraTotal);
    carteira = carteira - Number(txtValor);
    mudaFaseArvore(carteira, carteiraTotal);

    if(!String(carteira).includes('.'))
    {
        carteira = carteira + ',00';
    }
    document.getElementById('valorAtual').textContent = String(carteira).replace('.',',');
}

function areaSelecao(local, areaNovaSaida)
{
    const selecionarCategorias = document.createElement('div');
    selecionarCategorias.classList.add('selecionarCategorias');

    const areaOpcaoSelecionada = document.createElement('div');
    areaOpcaoSelecionada.classList.add('areaOpcaoSelecionada');

    const opcaoSelecionada = document.createElement('p');
    opcaoSelecionada.classList.add('opcao');
    opcaoSelecionada.classList.add('opcaoSelecionada');
    opcaoSelecionada.textContent = '- Selecione a categoria -';

    const btnMaisOpcoes = document.createElement('button');
    btnMaisOpcoes.classList.add('btnMaisOpcoes');

    const iconMaisOpcoes = document.createElement('img');
    iconMaisOpcoes.src = "img/seta.png";
    iconMaisOpcoes.classList.add('maisOpcoes');

    const naoSelecionado = document.createElement('div');
    naoSelecionado.classList.add('naoSelecionado');

    let opcaoEscolher = document.createElement('p');

    const btnNovaCategoria = document.createElement('div');
    btnNovaCategoria.classList.add('btnNovaCategoria');

    const imgNovaCategoria = document.createElement('img');
    imgNovaCategoria.src = 'img/adicionar_verde.svg';
    imgNovaCategoria.classList.add('imgNovaCategoria');

    const opcaoNovaCategoria = document.createElement('p');
    opcaoNovaCategoria.classList.add('opcao');
    opcaoNovaCategoria.textContent = 'Nova categoria';

    btnMaisOpcoes.appendChild(iconMaisOpcoes);
    areaOpcaoSelecionada.append(opcaoSelecionada, btnMaisOpcoes);

    btnNovaCategoria.append(imgNovaCategoria, opcaoNovaCategoria);

    fetch("http://localhost/trit/api/listarCategorias.php", {
    method: "GET",
        credentials: "include",
    })
    .then(function (resposta) {
        if (!resposta.ok) {
        throw new Error("Erro HTTP: " + resposta.status);
        }
        return resposta.json();
    })
    .then(function (dadosJSON) {
        if (dadosJSON) {
        for (let i = 0; i < dadosJSON.categorias.length; i++) {
            const opcao = dadosJSON.categorias[i];
            opcaoSelecionada.setAttribute('codigo', opcao.Codigo);
            opcaoEscolher = document.createElement('p');
            opcaoEscolher.classList.add('opcao');
            opcaoEscolher.classList.add('opcaoEscolher');
            opcaoEscolher.textContent = opcao.Nome;
            opcaoEscolher.setAttribute('codigo', opcao.Codigo);
            naoSelecionado.appendChild(opcaoEscolher);
        }
        naoSelecionado.appendChild(btnNovaCategoria);
        }
    })
    .catch(function (error) {
        console.warn(error);
    })
    .finally(function () {
    });

    selecionarCategorias.append(areaOpcaoSelecionada, naoSelecionado);

    local.appendChild(selecionarCategorias);

    let abaAberta = false;
    let opcoes = '';

    btnMaisOpcoes.addEventListener('click', function(e){

        abaOpcoes();
        
        opcoes = document.querySelectorAll('.opcaoEscolher');

        for (let i = 0; i < opcoes.length; i++) {
            const opcaoAtual = opcoes[i];
            let txtOpcaoAtual = opcaoAtual.textContent;

            opcaoAtual.addEventListener('click', function(e){

                opcaoSelecionada.textContent = txtOpcaoAtual;
                opcaoSelecionada.setAttribute('codigo', opcaoAtual.getAttribute('codigo'));
                selecionada();

                abaAberta = true;
                abaOpcoes();
            })
            
        }
    })

    function abaOpcoes(){
        if(abaAberta == false)
        {
            naoSelecionado.style.display = 'block';
            iconMaisOpcoes.style.transform = 'rotate(270deg)';
            areaOpcaoSelecionada.style.borderBottom = 'solid rgb(9, 95, 184) 2px';

            abaAberta = true;
        }
        else
        {
            naoSelecionado.style.display = 'none';
            iconMaisOpcoes.style.transform = 'rotate(90deg)';
            areaOpcaoSelecionada.style.borderBottom = 'none';

            abaAberta = false;
        }
    }

    btnNovaCategoria.addEventListener('click', function(e){
        e.preventDefault();

        areaNovaSaida.remove();

        naoSelecionado.style.display = 'none';
        iconMaisOpcoes.style.transform = 'rotate(90deg)';
        areaOpcaoSelecionada.style.borderBottom = 'none';
        abaAberta = false;

        btnSair = botaoSair();

        const areaNovaCategoria = document.createElement('div');
        areaNovaCategoria.classList.add('popup');

        const areaInfos = document.createElement('div');
        areaInfos.classList.add('infos');

        const areaTitulo = document.createElement('div');
        areaTitulo.classList.add('areaTitulo');

        const tituloNovaCategoria = document.createElement('p');
        tituloNovaCategoria.classList.add('titulo');
        tituloNovaCategoria.classList.add('tituloPopup');
        tituloNovaCategoria.textContent = 'Nova categoria';

        areaTitulo.append(tituloNovaCategoria, btnSair);

        const areaNomeCategoria = document.createElement('div');
        areaNomeCategoria.classList.add('areaDigitar');

        const labelNomeCategoria = document.createElement('label');
        labelNomeCategoria.textContent = 'Nome da categoria:';

        const txtNomeCategoria = document.createElement('input');
        txtNomeCategoria.type = 'text';
        txtNomeCategoria.classList.add('recuoPopup');
        areaRight = obrigatorioIcon(txtNomeCategoria);

        areaNomeCategoria.append(labelNomeCategoria, areaRight);

        const areaValorLimite = document.createElement('div');
        areaValorLimite.classList.add('areaDigitar');

        const labelValorLimite = document.createElement('label');
        labelValorLimite.textContent = 'Valor Limite:';

        const areaLeft = document.createElement('div');
        areaLeft.classList.add('areaLeft');

        const txtValorLimite = document.createElement('input');
        txtValorLimite.type = 'number';
        txtValorLimite.classList.add('recuoPopup');
        txtValorLimite.classList.add('inputMoeda');
        areaRight = obrigatorioIcon(txtValorLimite);

        const moeda = document.createElement('p');
        moeda.textContent = 'R$';
        moeda.classList.add('moeda');

        areaLeft.append(areaRight, moeda);
        areaValorLimite.append(labelValorLimite, areaLeft);

        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = 'Salvar';
        btnSalvar.classList.add('btnSalvar');

        areaInfos.append(areaNomeCategoria, areaValorLimite);
        areaNovaCategoria.append(areaTitulo, areaInfos, btnSalvar);
        bloqueio.appendChild(areaNovaCategoria);

        btnSair.addEventListener('click', function(e){
            e.preventDefault();

            areaNovaCategoria.remove();
            bloqueio.appendChild(areaNovaSaida);
        })

        btnSalvar.addEventListener('click', function(e){
            e.preventDefault();

            if(txtNomeCategoria.value == '')
            {
                erro(msgErro, txtNomeCategoria, 'Nome não foi informado!', areaInfos);
                return;
            }

            if(txtValorLimite.value == '')
            {
                erro(msgErro, txtValorLimite, 'Valor não foi informado!', areaInfos);
                return;
            }

            let valorSaida = String(txtValorLimite.value).replace(',','.');            

            valorSaida = Number(valorSaida);

            fetch("http://localhost/trit/api/criarCategoria.php", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "nome": txtNomeCategoria.value,
                    "valorLimite": valorSaida
                }
            ),
            })
            .then(function (resposta) {
                if (!resposta.ok) {
                throw new Error("Erro HTTP: " + resposta.status);
                }
                return resposta.json();
            })
            .then(function (dadosJSON) {
                if (dadosJSON) {
                    fetch("http://localhost/trit/api/listarCategorias.php", {
                    method: "GET",
                    credentials: "include",
                })
                .then(function (resposta) {
                    if (!resposta.ok) {
                        throw new Error("Erro HTTP: " + resposta.status);
                    }
                    return resposta.json();
                })
                .then(function (dadosJSON) {
                    if (dadosJSON) {
                        let indiceLimite = 4;
                        areaCategorias.textContent = '';
                        if(dadosJSON.categorias.length > 4){
                            console.log(dadosJSON.categorias);
                            listarCategorias(dadosJSON.categorias.length, dadosJSON.categorias);
                            areaCategorias.appendChild(btnMais);

                            btnMais.remove();
                            let btnMenos = document.createElement('button');
                            btnMenos.textContent = 'Ver Menos';
                            btnMenos.classList.add('verMais');
                            areaCategorias.appendChild(btnMenos);
                            
                            btnMenos.addEventListener('click', function(e){
                                e.preventDefault();
                                areaCategorias.textContent = '';
                                listarCategorias(indiceLimite, dadosJSON.categorias);
                                btnMenos.remove();
                                areaCategorias.appendChild(btnMais);
                            })
                        }else{
                            listarCategorias(dadosJSON.categorias.length, dadosJSON.categorias);
                        }
                    }
                    })
                    .catch(function (error) {
                        console.warn(error);
                    })
                    .finally(function () {
                    });
                
                }
            })
            .catch(function (error) {
                console.warn(error);
            })
            .finally(function () {
                // let nomeCategoriaAtual = txtNomeCategoria.value.charAt(0).toUpperCase() + txtNomeCategoria.value.slice(1);
                areaNovaCategoria.remove();
                criarAreaSaida('Categorizada');
                selecionada();
            });
        })

    })

    function selecionada()
    {
        const opcoesEscolher = document.querySelectorAll('.opcaoEscolher');

        for (let i = 0; i < opcoesEscolher.length; i++) {

            opcoesEscolher[i].style.backgroundColor = 'transparent';
            
            if(opcoesEscolher[i].textContent == opcaoSelecionada.textContent)
            {
                opcoesEscolher[i].style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
            }
        }
    }
}

function FormatarData(txtData){
    let data = txtData.value;
    let conjuntoData = data.split("/");
    
    let dataFormatada = `${conjuntoData[2]}-${conjuntoData[1]}-${conjuntoData[0]}`;
    return dataFormatada;
}


function alterarProgresso(txtValor, local){
    let valorAtual = local.querySelector('#valorAtualControlado').textContent.replace(',','.');
    let valorTotal = local.querySelector('#valorTotalControlado').textContent.replace(',','.');
    valorAtual = Number(valorAtual);
    valorTotal = Number(valorTotal);

    let valorAdicionado = valorAtual + Number(txtValor);
    let valorProgresso = (valorAdicionado * 100) / valorTotal;

    let progressoAtual = local.querySelector('progress');
    progressoAtual.setAttribute('value', valorProgresso);

    if(valorProgresso <= 100)
        {
            progressoAtual.setAttribute('value', valorProgresso);

            if(valorProgresso >= 35 && valorProgresso < 65){
                progressoAtual.classList.add('leve');
            }else{
                if(valorProgresso >= 65 && valorProgresso < 100){
                    progressoAtual.classList.add('alto');
                }else{
                    if(valorProgresso >= 100){
                        progressoAtual.classList.add('limite');
                        progressoAtual.setAttribute('value', 100);
                        local.querySelector('#valorAtualControlado').style.color = 'rgb(255, 85, 85)';
                        local.querySelector('#valorAtualControladoMoeda').style.color = 'rgb(255, 85, 85)';
                    }
                }
            }

        }

        if(!String(valorAdicionado).includes('.'))
        {
            valorAdicionado = valorAdicionado + ',00';
        }
        local.querySelector('#valorAtualControlado').textContent = String(valorAdicionado).replace('.',',');

}

function procuraVirgula(valorEx){
    if(!valorEx.includes(',')){
        return valorEx + ',00';
    }else{
        return valorEx;
    }
}

function listarCategorias(indiceLista, dadosLista){
    for (let i = 0; i < indiceLista; i++) {
        const categoria = dadosLista[i];
        fetch("http://localhost/trit/api/calcularValorGastoCategoria.php", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "categoria":categoria.Codigo
            }
            ),
        })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Erro HTTP: " + resposta.status);
            }
            return resposta.json();
        })
        .then(function (dadosJSON) {
            if (dadosJSON) {
                let valor = dadosJSON.Valor;
                let valorLimite = String(categoria.ValorLimite).replace(',','.');
                valor = Number(valor);
                valorLimite = Number(valorLimite);
                criarCategorias(areaCategorias, categoria.Nome, valor, valorLimite);
            }
            
        })
        .catch(function (error) {
            console.warn(error);
        })
        .finally(function () {
        });         
    }
}


function criarAreaSaida(txtTipo){
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

    const btnCategorizado = document.createElement('button');
    btnCategorizado.textContent = 'Categorizada';

    const btnFixo = document.createElement('button');
    btnFixo.textContent = 'Fixa';

    const btnParcelado = document.createElement('button');
    btnParcelado.textContent = 'Parcelada';

    areaTitulo.append(tituloNovaSaida, btnSair);

    opcoesSaida.append(btnCategorizado, btnFixo, btnParcelado);

    areaNovaSaida.append(areaTitulo, opcoesSaida);

    bloqueio.appendChild(areaNovaSaida)

    body.append(bloqueio);

    btnSair.addEventListener('click', function(e){
        e.preventDefault();

        areaNovaSaida.remove();
        avisoSair(bloqueio);
    })

    const areaInfos = document.createElement('div');
    areaInfos.classList.add('infos');

    const areaNomeSaida = document.createElement('div');
    areaNomeSaida.classList.add('areaDigitar');

    const labelNomeSaida = document.createElement('label');
    labelNomeSaida.textContent = 'Nome:'

    const txtNomeSaida = document.createElement('input');
    txtNomeSaida.type = 'text';
    txtNomeSaida.classList.add('recuoPopup');
    areaRight = obrigatorioIcon(txtNomeSaida);

    areaNomeSaida.append(labelNomeSaida, areaRight);

    const divAlinhamento = document.createElement('div');
    divAlinhamento.classList.add('divAlinhamento');

    const areaTipoSaida = document.createElement('div');
    areaTipoSaida.classList.add('areaDigitar');

    const labelTipoSaida = document.createElement('label');
    labelTipoSaida.textContent = 'Tipo:'

    const txtTipoSaida = document.createElement('input');
    txtTipoSaida.type = 'text';
    txtTipoSaida.disabled = true;

    areaTipoSaida.append(labelTipoSaida, txtTipoSaida);

    const areaDataSaida = document.createElement('div');
    areaDataSaida.classList.add('areaDigitar');

    const labelDataSaida = document.createElement('label');
    labelDataSaida.textContent = 'Data:'

    const txtDataSaida = document.createElement('input');
    txtDataSaida.type = 'text';
    txtDataSaida.classList.add('recuoPopup');
    txtDataSaida.inputMode = 'numeric';
    txtDataSaida.value = 'dd/mm/aaaa';
    formataInputData(txtDataSaida, null);
    areaRight = obrigatorioIcon(txtDataSaida);
    areaDataSaida.append(labelDataSaida, areaRight);

    const areaDataLimite = document.createElement('div');
    areaDataLimite.classList.add('areaDigitar');

    const labelDataLimite = document.createElement('label');
    labelDataLimite.textContent = 'Data Limite:'

    const txtDataLimite = document.createElement('input');
    txtDataLimite.type = 'text';
    txtDataLimite.classList.add('recuoPopup');
    areaRight = obrigatorioIcon(txtDataLimite);
    areaDataLimite.append(labelDataLimite, areaRight);

    const areaValorSaida = document.createElement('div');
    areaValorSaida.classList.add('areaDigitar');

    const labelValorSaida = document.createElement('label');
    labelValorSaida.textContent = 'Valor:'

    const areaLeft = document.createElement('div');
    areaLeft.classList.add('areaLeft');

    const txtValorSaida = document.createElement('input');
    txtValorSaida.type = 'number';
    txtValorSaida.classList.add('recuoPopup');
    txtValorSaida.classList.add('inputMoeda');

    const moeda = document.createElement('p');
    moeda.textContent = 'R$';
    moeda.classList.add('moeda');

    areaLeft.append(txtValorSaida, moeda);
    areaValorSaida.append(labelValorSaida, obrigatorioIcon(areaLeft));

    const areaParcelas = document.createElement('div');
    areaParcelas.classList.add('areaDigitar');

    const labelParcelas = document.createElement('label');
    labelParcelas.textContent = 'Nº de parcelas:'

    const txtParcelas = document.createElement('input');
    txtParcelas.type = 'number';
    txtParcelas.classList.add('recuoPopup');
    areaRight = obrigatorioIcon(txtParcelas);
    areaParcelas.append(labelParcelas, areaRight);

    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.classList.add('btnSalvar');

    if(!txtTipo || txtTipo == null || txtTipo == ''){
        btnCategorizado.addEventListener('click', function(e){
            e.preventDefault();
            
            opcoesSaida.remove();
            divAlinhamento.innerHTML = '';
            areaInfos.innerHTML = '';
            txtTipoSaida.value = 'Categorizada';
            
            divAlinhamento.append(areaTipoSaida, areaDataSaida);
            
            areaSelecao(areaInfos, areaNovaSaida);
            areaInfos.append(areaNomeSaida, divAlinhamento, areaValorSaida);
            areaNovaSaida.append(areaInfos, btnSalvar);
        })

        btnFixo.addEventListener('click', function(e){
            e.preventDefault();

            opcoesSaida.remove();
            divAlinhamento.innerHTML = '';
            areaInfos.innerHTML = '';
            txtTipoSaida.value = 'Fixa';

            divAlinhamento.append(areaTipoSaida, areaDataSaida);

            areaInfos.append(areaNomeSaida, divAlinhamento, areaValorSaida);
            areaNovaSaida.append(areaInfos, btnSalvar);
        })

        btnParcelado.addEventListener('click', function(e){
            e.preventDefault();

            opcoesSaida.remove();
            divAlinhamento.innerHTML = '';
            areaInfos.innerHTML = '';
            txtTipoSaida.value = 'Parcelada';

            divAlinhamento.append(areaDataSaida, areaDataLimite, areaTipoSaida, areaParcelas);

            areaInfos.append(areaNomeSaida, divAlinhamento, areaValorSaida);
            areaNovaSaida.append(areaInfos, btnSalvar);
        })
    }else{
        if(txtTipo == 'Categorizada'){
            opcoesSaida.remove();
            divAlinhamento.innerHTML = '';
            areaInfos.innerHTML = '';
            txtTipoSaida.value = 'Categorizada';
            
            divAlinhamento.append(areaTipoSaida, areaDataSaida);
            
            areaSelecao(areaInfos, areaNovaSaida);
            areaInfos.append(areaNomeSaida, divAlinhamento, areaValorSaida);
            areaNovaSaida.append(areaInfos, btnSalvar);
        }
    }

    btnSalvar.addEventListener('click', function(e){
        e.preventDefault();
        
        if(txtTipoSaida.value == 'Categorizada') 
        {

            if(document.querySelector('.areaOpcaoSelecionada').textContent == '- Selecione a categoria -')
            {
                erro(msgErro, null, 'Selecione uma categoria!', areaInfos);
                return;
            }
        }

        if(txtNomeSaida.value == '')
        {
            erro(msgErro, txtNomeSaida, 'Nome não foi informado!', areaInfos);
            return;
        }

        if(txtDataSaida.value == '')
        {
            erroEncontrado = validaData(txtDataSaida, areaInfos);
            if(erroEncontrado){
                return;
            }
        }

        if(txtTipoSaida.value == 'Parcelada')
        {

            if(txtDataLimite.value == '')
            {
                erro(msgErro, txtDataLimite, 'Data limite não foi informada!', areaInfos);
                return; 
            }

            if(txtParcelas.value == '')
            {
                erro(msgErro, txtParcelas, 'Número de parcelas não informado!', areaInfos);
                return;
            }
        }

        if(txtValorSaida.value == '')
        {
            erro(msgErro, txtValorSaida, 'Valor não foi informado!', areaInfos);
            return;
        }

        const selecionado = document.querySelector('.areaOpcaoSelecionada p');
        if(txtTipoSaida.value == 'Categorizada'){
            areaNovaSaida.remove();
            let categoria = selecionado.getAttribute('codigo');
            let dataSaida = FormatarData(txtDataSaida, txtDataSaida, areaInfos);
            let valor = String(txtValorSaida.value).replace(',','.');
            valor = Number(valor);
            criarSaida(txtNomeSaida.value, txtTipoSaida.value, dataSaida, valor, null, null, null, categoria, selecionado);
        }


        if(txtTipoSaida.value == 'Fixa'){
            areaNovaSaida.remove();
            let dataLimite = FormatarData(txtDataSaida, txtDataSaida, areaInfos);
            let valor = String(txtValorSaida.value).replace(',','.');
            valor = Number(valor);
            criarSaida(txtNomeSaida.value, txtTipoSaida.value, dataLimite, valor, null, null, null, null, selecionado);
        }

        if(txtTipoSaida.value == 'Parcelada'){
            areaNovaSaida.remove();
            let dataSaida = FormatarData(txtDataSaida, txtDataSaida, areaInfos);
            let dataLimite = FormatarData(txtDataSaida, txtDataLimite, areaInfos);
            let valor = String(txtValorSaida.value).replace(',','.');
            valor = Number(valor);
            criarSaida(txtNomeSaida.value, txtTipoSaida.value, dataSaida, valor, dataLimite, null, txtParcelas.value, null, selecionado);
        }
    })
}

function criarSaida(txtNome, txtTipo, txtData, txtValor, txtDataLimite, txtStatus, txtParcelas, txtCategoria, selecionado){
    fetch("http://localhost/trit/api/criarSaida.php", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
        {
            "nome":txtNome,
            "valor":txtValor,
            "data":txtData,
            "prazo":txtDataLimite,
            "tipo":txtTipo.toLowerCase(),
            "status":txtStatus,
            "parcelas":txtParcelas,
            "categoria":txtCategoria
        }
    ),
    })
    .then(function (resposta) {
        if (!resposta.ok) {
        throw new Error("Erro HTTP: " + resposta.status);
        }
        return resposta.json();
    })
    .then(function (dadosJSON) {
        if (dadosJSON) {
        bloqueio.remove();
        bloqueio.innerHTML = '';
            if(txtTipo === 'Categorizada'){
                let nomeCategoria = selecionado.textContent;
                let categorias = document.querySelectorAll('.controlado');
                for (let i = 0; i < categorias.length; i++) {
                    const categoria = categorias[i];
                    if(categoria.querySelector('.tituloControlado p').textContent == nomeCategoria){
                            alterarProgresso(txtValor, categoria);
                            alterarCarteira(txtValor);
                    }
                }

            }

            if(txtTipo === 'Fixa'){
                console.log('fixou!');
                alterarCarteira(txtValor);
            }

            if(txtTipo === 'Parcelada'){
                console.log('parcelou!');
                alterarCarteira(txtValor);
            }
        }
    })
    .catch(function (error) {
        console.warn(error);
    })
    .finally(function () {
    });
}

function areaPopupEditar(local, txtNome, txtValorAtual, txtValorLimite){
    console.log(txtValorAtual);
    const popup = document.createElement('div');
    popup.classList.add('popup');

        const areaTitulo = document.createElement('div');
        areaTitulo.classList.add('areaTitulo');

            const tituloPopup = document.createElement('h1');
            tituloPopup.classList.add('titulo');
            tituloPopup.classList.add('tituloPopup');
            tituloPopup.textContent = txtNome;

            btnSair.addEventListener('click', function(e){
                e.preventDefault();
        
                popup.remove();
                avisoSair(bloqueio);
            })
        areaTitulo.appendChild(tituloPopup);
        areaTitulo.appendChild(btnSair);

        const areaValor = document.createElement('div');
        areaValor.classList.add('divAlinhamento');
            const areaValorAtual = document.createElement('div');
            areaValorAtual.classList.add('areaDigitar');

                const labelValorAtual = document.createElement('label');
                labelValorAtual.textContent = 'Valor:'

                let areaLeft = document.createElement('div');
                areaLeft.classList.add('areaLeft');

                const inputValorAtual = document.createElement('input');
                inputValorAtual.type = 'number';
                inputValorAtual.classList.add('recuoPopup');
                inputValorAtual.classList.add('inputMoeda');
                inputValorAtual.value = txtValorAtual;

                    let moeda = document.createElement('p');
                    moeda.textContent = 'R$';
                    moeda.classList.add('moeda');

                areaLeft.appendChild(inputValorAtual);
                areaLeft.appendChild(moeda);

            areaValorAtual.appendChild(labelValorAtual);
            areaValorAtual.appendChild(areaLeft);


            const areaValorLimite = document.createElement('div');
            areaValorLimite.classList.add('areaDigitar');

                const labelValorLimite = document.createElement('label');
                labelValorLimite.textContent = 'Valor Limite:'

                areaLeft = document.createElement('div');
                areaLeft.classList.add('areaLeft');

                const inputValorLimite = document.createElement('input');
                inputValorLimite.type = 'number';
                inputValorLimite.classList.add('recuoPopup');
                inputValorLimite.classList.add('inputMoeda');
                inputValorLimite.value = txtValorLimite;

                    moeda = document.createElement('p');
                    moeda.textContent = 'R$';
                    moeda.classList.add('moeda');

                areaLeft.appendChild(inputValorLimite);
                areaLeft.appendChild(moeda);
            areaValorLimite.appendChild(labelValorLimite);
            areaValorLimite.appendChild(areaLeft);
        
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