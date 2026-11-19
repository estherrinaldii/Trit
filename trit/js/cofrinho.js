if(sessionStorage['logado'] == null || sessionStorage['logado'] == ""){
    window.location.href = "http://localhost/Trit/trit/login.html";
}

import { erro, formataInputValor, formataInputData, validaData, botaoSair, avisoSair, obrigatorioIcon, FormatarData } from "./funcoes.js";

const body = document.querySelector('body');
const main = document.querySelector('main');

let areaSemCofre = '';
exibirCofres();


const msgErro = document.createElement('p');
msgErro.classList.add('erro');

const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio');
let btnSair = botaoSair();

let prateleiraItens = 2;
botaoAdicionar();

function areaSelecaoPlanta()
{
    const selecionarPlantas = document.createElement('div');
    selecionarPlantas.classList.add('selecionar');

    const areaPlantaSelecionada = document.createElement('div');
    areaPlantaSelecionada.classList.add('areaOpcaoSelecionada');

    const plantaSelecionada = document.createElement('div');
    plantaSelecionada.classList.add('opcao');
    plantaSelecionada.classList.add('opcaoSelecionada');
    plantaSelecionada.classList.add('plantaSelecionada');
    plantaSelecionada.textContent = '- Selecione uma planta -';

    const btnMaisPlantas = document.createElement('button');
    btnMaisPlantas.classList.add('btnMaisOpcoes');

    const iconMaisPlantas = document.createElement('img');
    iconMaisPlantas.src = "img/seta.svg";
    iconMaisPlantas.classList.add('maisOpcoes');

    const plantaNaoSelecionada = document.createElement('div');
    plantaNaoSelecionada.classList.add('naoSelecionado');

    const planta1 = document.createElement('div');
    planta1.classList.add('opcao');
    planta1.classList.add('plantasEscolher');
    planta1.setAttribute('planta', 'cacto');
    planta1.setAttribute('id', 3);    
    
    const planta1Img = document.createElement('img');
    planta1Img.src = 'img/plantas/icons/cacto-icon.svg';

    const planta1txt = document.createElement('p');
    planta1txt.textContent = 'Cacto';

    planta1.append(planta1Img, planta1txt);

    const planta2 = document.createElement('div');
    planta2.classList.add('opcao');
    planta2.classList.add('plantasEscolher');
    planta2.setAttribute('planta', 'lirio');
    planta2.setAttribute('id', 2);    
    
    const planta2Img = document.createElement('img');
    planta2Img.src = 'img/plantas/icons/lirio-icon.svg';

    const planta2txt = document.createElement('p');
    planta2txt.textContent = 'Lírio';

    planta2.append(planta2Img, planta2txt);

    const planta3 = document.createElement('div');
    planta3.classList.add('opcao');
    planta3.classList.add('plantasEscolher');
    planta3.setAttribute('planta', 'peonia');
    planta3.setAttribute('id', 4);    
    
    const planta3Img = document.createElement('img');
    planta3Img.src = 'img/plantas/icons/peonia-icon.svg';

    const planta3txt = document.createElement('p');
    planta3txt.textContent = 'Peônia';

    planta3.append(planta3Img, planta3txt);

    const planta4 = document.createElement('div');
    planta4.classList.add('opcao');
    planta4.classList.add('plantasEscolher');
    planta4.setAttribute('planta', 'zamioculca');
    planta4.setAttribute('id', 1);    
    
    const planta4Img = document.createElement('img');
    planta4Img.src = 'img/plantas/icons/zamioculca-icon.svg';

    const planta4txt = document.createElement('p');
    planta4txt.textContent = 'Zamioculca';

    planta4.style.borderBottom = 'none';

    planta4.append(planta4Img, planta4txt);

    btnMaisPlantas.appendChild(iconMaisPlantas);
    areaPlantaSelecionada.append(plantaSelecionada, btnMaisPlantas);

    plantaNaoSelecionada.append(planta1, planta2, planta3, planta4);

    selecionarPlantas.append(areaPlantaSelecionada, plantaNaoSelecionada);

    let abaAberta = false;
    let opcoes = '';

    btnMaisPlantas.addEventListener('click', function(e){

        abaOpcoes();
        
        opcoes = document.querySelectorAll('.plantasEscolher');

        for (let i = 0; i < opcoes.length; i++) {
            const opcaoAtual = opcoes[i];

            let imgOpcaoAtual = opcaoAtual.querySelector('img');
            let txtOpcaoAtual = opcaoAtual.querySelector('p');

            opcaoAtual.addEventListener('click', function(e){

                plantaSelecionada.textContent = '';
                plantaSelecionada.append(imgOpcaoAtual.cloneNode(true), txtOpcaoAtual.cloneNode(true));
                plantaSelecionada.setAttribute('planta', opcaoAtual.getAttribute('planta'));
                plantaSelecionada.setAttribute('id', opcaoAtual.getAttribute('id'));
                selecionada();

                abaAberta = true;
                abaOpcoes();
            }) 
        }
    })

    function abaOpcoes(){
        if(abaAberta == false)
        {
            plantaNaoSelecionada.style.display = 'block';
            iconMaisPlantas.style.transform = 'rotate(270deg)';
            areaPlantaSelecionada.style.borderBottom = 'solid rgb(9, 95, 184) 2px';

            abaAberta = true;
        }
        else
        {
            plantaNaoSelecionada.style.display = 'none';
            iconMaisPlantas.style.transform = 'rotate(90deg)';
            areaPlantaSelecionada.style.borderBottom = 'none';

            abaAberta = false;
        }
    }

    function selecionada()
    {
        const opcoesEscolher = document.querySelectorAll('.plantasEscolher');

        for (let i = 0; i < opcoesEscolher.length; i++) {

            opcoesEscolher[i].style.backgroundColor = 'transparent';
            
            if(opcoesEscolher[i].textContent == plantaSelecionada.textContent)
            {
                opcoesEscolher[i].style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
            }
        }
    }

    return selecionarPlantas;
}

function areaSelecaoPeriodo(dataLimite)
{
    const selecionarPeriodo = document.createElement('div');
    selecionarPeriodo.classList.add('selecionar');

    const areaPeriodoSelecionado = document.createElement('div');
    areaPeriodoSelecionado.classList.add('areaOpcaoSelecionada');

    const periodoSelecionado = document.createElement('p');
    periodoSelecionado.classList.add('opcao');
    periodoSelecionado.classList.add('opcaoSelecionada');
    periodoSelecionado.classList.add('periodoSelecionado');
    periodoSelecionado.textContent = 'Indeterminado';

    const btnMaisOpcoes = document.createElement('button');
    btnMaisOpcoes.classList.add('btnMaisOpcoes');

    const iconMaisOpcoes = document.createElement('img');
    iconMaisOpcoes.src = "img/seta.svg";
    iconMaisOpcoes.classList.add('maisOpcoes');

    const naoSelecionado = document.createElement('div');
    naoSelecionado.classList.add('naoSelecionado');

    const periodo1 = document.createElement('p');
    periodo1.classList.add('opcao');
    periodo1.classList.add('periodoEscolher');
    periodo1.textContent = 'Indeterminado'
    periodo1.style.backgroundColor = 'rgba(9, 95, 184, 0.21)'

    const periodo2 = document.createElement('p');
    periodo2.classList.add('opcao');
    periodo2.classList.add('periodoEscolher');
    periodo2.textContent = 'Determinado';
    periodo2.style.borderBottom = 'none';

    btnMaisOpcoes.appendChild(iconMaisOpcoes);
    areaPeriodoSelecionado.append(periodoSelecionado, btnMaisOpcoes);

    naoSelecionado.append(periodo1, periodo2);

    selecionarPeriodo.append(areaPeriodoSelecionado, naoSelecionado);

    let abaAberta = false;
    let opcoes = '';

    btnMaisOpcoes.addEventListener('click', function(e){

        abaOpcoes();
        
        opcoes = document.querySelectorAll('.periodoEscolher');

        for (let i = 0; i < opcoes.length; i++) {
            const opcaoAtual = opcoes[i];
            let txtOpcaoAtual = opcaoAtual.textContent;

            opcaoAtual.addEventListener('click', function(e){

                periodoSelecionado.textContent = txtOpcaoAtual;

                if(txtOpcaoAtual == 'Determinado')
                {
                    dataLimite.disabled = false;
                }
                else
                {
                    dataLimite.disabled = true;
                }

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
            areaPeriodoSelecionado.style.borderBottom = 'solid rgb(9, 95, 184) 2px';

            abaAberta = true;
        }
        else
        {
            naoSelecionado.style.display = 'none';
            iconMaisOpcoes.style.transform = 'rotate(90deg)';
            areaPeriodoSelecionado.style.borderBottom = 'none';

            abaAberta = false;
        }
    }

    function selecionada()
    {
        const opcoesEscolher = document.querySelectorAll('.periodoEscolher');

        for (let i = 0; i < opcoesEscolher.length; i++) {

            opcoesEscolher[i].style.backgroundColor = 'transparent';
            
            if(opcoesEscolher[i].textContent == periodoSelecionado.textContent)
            {
                opcoesEscolher[i].style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
            }
        }
    }

    return selecionarPeriodo;
}

function botaoAdicionar()
{
    const btnAdicionar = document.querySelector('.btnAdicionar');

    btnAdicionar.addEventListener('click', function(e){
        e.preventDefault();

        bloqueio.innerHTML = '';

        const areaCriarCofre = document.createElement('div');
        areaCriarCofre.classList.add('popup');

        const areaTitulo = document.createElement('div');
        areaTitulo.classList.add('areaTitulo');

        const tituloCriarCofre = document.createElement('p');
        tituloCriarCofre.textContent = 'Novo Cofrinho';
        tituloCriarCofre.classList.add('titulo');
        tituloCriarCofre.classList.add('tituloPopup');

        btnSair = botaoSair();

        areaTitulo.append(tituloCriarCofre, btnSair);

        const areaInfos = document.createElement('div');
        areaInfos.classList.add('infos')
        
        const areaNomeCofre = document.createElement('div');
        areaNomeCofre.classList.add('areaDigitar');

        const labelNomeCofre = document.createElement('label');
        labelNomeCofre.textContent = 'Nome:';

        const txtNomeCofre = document.createElement('input');
        txtNomeCofre.type = 'text';
        txtNomeCofre.classList.add('recuoPopup');

        areaNomeCofre.append(labelNomeCofre, obrigatorioIcon(txtNomeCofre));

        const areaPeriodo = document.createElement('div');
        areaPeriodo.classList.add('areaDigitar');

        const labelPeriodo = document.createElement('label');
        labelPeriodo.textContent = 'Período:';

        const divAlinhamento = document.createElement('div');
        divAlinhamento.classList.add('divAlinhamento');

        const areaDataCofre = document.createElement('div');
        areaDataCofre.classList.add('areaDigitar');

        const labelDataCofre = document.createElement('label');
        labelDataCofre.textContent = 'Data limite:';

        const txtDataCofre = document.createElement('input');
        txtDataCofre.type = 'text';
        txtDataCofre.disabled = true;
        txtDataCofre.value = 'dd/mm/aaaa';
        txtDataCofre.inputMode = 'numeric';

        formataInputData(txtDataCofre, null);

        areaPeriodo.append(labelPeriodo, areaSelecaoPeriodo(txtDataCofre))
        areaDataCofre.append(labelDataCofre, txtDataCofre);

        const areaValorCofre = document.createElement('div');
        areaValorCofre.classList.add('areaDigitar');

        const labelValorCofre = document.createElement('label');
        labelValorCofre.textContent = 'Valor limite:';

        const areaLeft = document.createElement('div');
        areaLeft.classList.add('areaLeft');

        const txtValorCofre = document.createElement('input');
        txtValorCofre.type = 'text';
        txtValorCofre.inputMode = 'numeric';
        txtValorCofre.value = '0,00';
        txtValorCofre.classList.add('recuoPopup');
        txtValorCofre.classList.add('inputMoeda');

        const moeda = document.createElement('p');
        moeda.textContent = 'R$';
        moeda.classList.add('moeda');

        areaLeft.append(txtValorCofre, moeda);

        formataInputValor(txtValorCofre, null);

        areaValorCofre.append(labelValorCofre, obrigatorioIcon(areaLeft));
        divAlinhamento.append(areaDataCofre, areaValorCofre);

        const areaPlantaSelecionada = document.createElement('div');
        areaPlantaSelecionada.classList.add('areaDigitar');

        const labelPlanta = document.createElement('label');
        labelPlanta.textContent = 'Planta:';

        areaPlantaSelecionada.append(labelPlanta, areaSelecaoPlanta());

        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = 'Salvar';
        btnSalvar.classList.add('btnSalvar');

        areaInfos.append(areaNomeCofre, areaPeriodo, divAlinhamento, areaPlantaSelecionada);

        areaCriarCofre.append(areaTitulo, areaInfos, btnSalvar)

        bloqueio.appendChild(areaCriarCofre);
        body.appendChild(bloqueio);

        btnSair.addEventListener('click', function(e){
            e.preventDefault();

            areaCriarCofre.remove();
            avisoSair(bloqueio);
        })

        btnSalvar.addEventListener('click', function(e){
            e.preventDefault();

            if(txtNomeCofre.value == '')
            {
                erro(msgErro, txtNomeCofre, 'Nome não foi informado!', areaInfos);
                return;
            }

            if(document.querySelector('.periodoSelecionado').textContent == 'Determinado')
            {
                let erroEncontrado = '';
                erroEncontrado = validaData(msgErro, txtDataCofre, areaInfos);
                if(erroEncontrado)
                {
                    return;
                }
            }

            if(txtValorCofre.value == '' || txtValorCofre.value == '0,00')
            {
                erro(msgErro, txtValorCofre, 'Valor limite não foi informado!', areaInfos);
                return;
            }

            if(document.querySelector('.plantaSelecionada').textContent == '- Selecione uma planta -')
            {
                erro(msgErro, null, 'Selecione uma planta!', areaInfos);
                return;
            }

            const plantaEnviada = document.querySelector('.plantaSelecionada').getAttribute('planta');

            // fetch criar cofre:
            // nome = txtNomeCofre.value
            // periodo = document.querySelector('.periodoSelecionado').textContent (envia em texto com primeira letra maiuscula, formata do jeito q o banco espera receber)
            // data = txtDataCofre.value >> se for indeterminado é null 
            // valor limite = txtValorCofre.value
            // planta = plantaEnviada
            // progresso/porcentagem é zero, já que está sendo criada uma planta nova
            // valor atual tambem é 0,00 pela mesma lógica do anterior
            let valorLimiteEnviar = txtValorCofre.value;
            valorLimiteEnviar = String(valorLimiteEnviar).replaceAll(',','.');
            valorLimiteEnviar = Number(valorLimiteEnviar);
            let periodo = String(document.querySelector('.periodoSelecionado').textContent).toLowerCase();
            let periodoEx = document.querySelector('.periodoSelecionado').textContent;
            let prazo = FormatarData(txtDataCofre);
            let codigoPlanta = document.querySelector('.plantaSelecionada').id;
            if(document.querySelector('.periodoSelecionado').textContent === 'Indeterminado'){
                prazo = null;
            }

            fetch("http://localhost/Trit/trit/api/criarCofrinho.php", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "nome":txtNomeCofre.value,
                    "tipo":periodo,
                    "valor_final":valorLimiteEnviar,
                    "prazo":prazo,
                    "planta":codigoPlanta
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
                    criarPlanta(txtNomeCofre.value, periodoEx, txtDataCofre.value, plantaEnviada, 0, null);
                    informacoesCofre();
                }
            })
            .catch(function (error) {
                console.warn(error);
            });
            
            areaCriarCofre.remove();
            bloqueio.remove();
        })
    })
}

function exibirCofres()
{
    if(!document.querySelector('.planta'))
    {
        areaSemCofre = document.createElement('div');
        areaSemCofre.classList.add('areaSemCofre');

        const btnAdicionar = document.createElement('img');
        btnAdicionar.src = 'img/adicionar.svg';
        btnAdicionar.classList.add('btnAdicionar');

        const txtSemCofre = document.createElement('p');
        txtSemCofre.textContent = 'Crie um cofrinho para suas economias!'
        txtSemCofre.classList.add('semCofre');

        areaSemCofre.append(btnAdicionar, txtSemCofre);
        main.appendChild(areaSemCofre);
    }
    
    fetch("http://localhost/Trit/trit/api/listarCofrinhos.php", {
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
            for (let i = 0; i < dadosJSON.cofrinhos.length; i++) {
                const cofrinho = dadosJSON.cofrinhos[i];
                let valorAtual = cofrinho.ValorAtual;
                let valorFinal = cofrinho.ValorFinal;
                let porcentagem = (Number(valorAtual) / Number(valorFinal)) * 100;
                if(porcentagem > 100){
                    porcentagem = 100;
                }else{
                    porcentagem = porcentagem.toFixed(0);
                }

                let primeiraLetra = String(cofrinho.Tipo).charAt(0);
                let tipo = primeiraLetra.toUpperCase() + String(cofrinho.Tipo).slice(1);
                let data = String(cofrinho.Prazo);
                let conjuntoData = data.split("-");
                let dataFormatada = `${conjuntoData[2]}/${conjuntoData[1]}/${conjuntoData[0]}`;

                criarPlanta(cofrinho.Nome, tipo, dataFormatada, cofrinho.Planta.Nome.toLowerCase(), porcentagem, cofrinho.Codigo);
            }
            informacoesCofre();
        }
    })
    .catch(function (error) {
        console.warn(error);
    })
    .finally(function () {
        const plantinhas = document.querySelectorAll('.planta');
       for (let iPlanta = 0; iPlanta < plantinhas.length; iPlanta++) {
        const plantinha = plantinhas[iPlanta];
        let nomePlanta = plantinha.querySelector('.plantaImg');
        nomePlanta = String(nomePlanta.src).split('/');
        nomePlanta = nomePlanta[7];
        ajustaPercentual(null, null, plantinha, nomePlanta, plantinha.querySelector('.plantaImg'), null, plantinha.id);
       }
    });

}

function criarPlanta(nome, periodo, data, planta, porcentagem, codigo)
{
    let areaAdicionar = '';
    let tituloAdicionar = '';
    let qualImagem = 0;

    if(porcentagem < 20)
    {
        qualImagem = 1;
    }
    else
    {
        if(porcentagem >= 20 && porcentagem < 40)
        {
            qualImagem = 2;
        }
        else
        {
            if(porcentagem >= 40 && porcentagem < 60)
            {
                qualImagem = 3;
            }
            else
            {
                if(porcentagem >= 60 && porcentagem < 80)
                {
                    qualImagem = 4;
                }
                else
                {
                    qualImagem = 5;
                }
            }
        }
    }

    if(!document.querySelector('.planta'))
    {
        areaAdicionar = document.createElement('div');
        areaAdicionar.classList.add('areaAdicionar');

        const btnAdicionarPlanta = document.createElement('img');
        btnAdicionarPlanta.src = 'img/adicionar.svg';
        btnAdicionarPlanta.classList.add('btnAdicionar');

        const vasoBotao = document.createElement('img');
        vasoBotao.src = 'img/plantas/vaso.svg';

        tituloAdicionar = document.createElement('p');
        tituloAdicionar.classList.add('tituloAdicionar');

        areaAdicionar.append(btnAdicionarPlanta, vasoBotao);
    }

    const cofrinhos = document.querySelector('.cofrinhos');
    const prateleirasPlantas = document.querySelectorAll('.plantaPrateleira');
    const todasPlantas = document.querySelectorAll('.planta');

    if(prateleirasPlantas.length == 0)
    {
        areaSemCofre.remove();
        
        const plantaPrateleira = document.createElement('div');
        plantaPrateleira.classList.add('plantaPrateleira');

        const plantas = document.createElement('div');
        plantas.classList.add('plantas');

        const prateleira = document.createElement('prateleira');
        prateleira.classList.add('prateleira');

        const plantaCriada = document.createElement('div');
        plantaCriada.classList.add('planta'); 
        if(codigo){
            plantaCriada.id = codigo;
        }

        const plantaImg = document.createElement('img');
        plantaImg.src = 'img/plantas/' + planta + '/' + planta + '-f' + qualImagem + '.svg';
        plantaImg.classList.add('plantaImg');

        const vasoPlanta = document.createElement('img');
        vasoPlanta.src = 'img/plantas/vaso.svg';

        const porcentagemPlanta = document.createElement('p');
        porcentagemPlanta.classList.add('porcentagem');
        porcentagemPlanta.textContent = Number(porcentagem).toFixed(0) + '%';

        plantaCriada.append(plantaImg, vasoPlanta, porcentagemPlanta);

        const nomePlanta = document.createElement('p');
        nomePlanta.classList.add('tituloCofre');
        nomePlanta.textContent = nome.charAt(0).toUpperCase() + nome.slice(1);

        plantas.append(areaAdicionar, plantaCriada);
        prateleira.append(tituloAdicionar, nomePlanta);

        plantaPrateleira.append(plantas, prateleira);
        cofrinhos.appendChild(plantaPrateleira);

        if(periodo == 'Determinado')
        {
            plantaCriada.prepend(addStatus());
        }

        botaoAdicionar();
    }
    else
    {
        let prateleiraCheia = prateleiraItens / 3;

        if(Number.isInteger(prateleiraCheia))
        {
            const plantaPrateleira = document.createElement('div');
            plantaPrateleira.classList.add('plantaPrateleira');

            const plantas = document.createElement('div');
            plantas.classList.add('plantas');

            const prateleira = document.createElement('prateleira');
            prateleira.classList.add('prateleira');

            const plantaCriada = document.createElement('div');
            plantaCriada.classList.add('planta');
            if(codigo){
                plantaCriada.id = codigo;
            }

            const plantaImg = document.createElement('img');
            plantaImg.src = 'img/plantas/' + planta + '/' + planta + '-f' + qualImagem + '.svg';
            plantaImg.classList.add('plantaImg');

            const vasoPlanta = document.createElement('img');
            vasoPlanta.src = 'img/plantas/vaso.svg';

            const porcentagemPlanta = document.createElement('p');
            porcentagemPlanta.classList.add('porcentagem');
            porcentagemPlanta.textContent = porcentagem + '%';

            plantaCriada.append(plantaImg, vasoPlanta, porcentagemPlanta);

            const nomePlanta = document.createElement('p');
            nomePlanta.classList.add('tituloCofre');
            nomePlanta.textContent = nome.charAt(0).toUpperCase() + nome.slice(1);

            plantas.appendChild(plantaCriada);
            prateleira.appendChild(nomePlanta);

            plantaPrateleira.append(plantas, prateleira);
            cofrinhos.appendChild(plantaPrateleira);

            if(periodo == 'Determinado')
            {
                plantaCriada.prepend(addStatus());
            }

            prateleiraItens = 1;
        }
        else
        {
            const plantaPrateleira = document.querySelectorAll('.plantaPrateleira');
            const plantas = document.querySelectorAll('.plantas');
            const prateleira = document.querySelectorAll('.prateleira');

            const plantaPrateleiraAdicionar = plantaPrateleira.length - 1;
            const plantasAdicionar = plantas.length - 1;
            const prateleiraAdicionar = prateleira.length - 1;

            const plantaCriada = document.createElement('div');
            plantaCriada.classList.add('planta');
            if(codigo){
                plantaCriada.id = codigo;
            }

            const plantaImg = document.createElement('img');
            plantaImg.src = 'img/plantas/' + planta + '/' + planta + '-f' + qualImagem + '.svg';
            plantaImg.classList.add('plantaImg');

            const vasoPlanta = document.createElement('img');
            vasoPlanta.src = 'img/plantas/vaso.svg';

            const porcentagemPlanta = document.createElement('p');
            porcentagemPlanta.classList.add('porcentagem');
            porcentagemPlanta.textContent = porcentagem + '%';

            plantaCriada.append(plantaImg, vasoPlanta, porcentagemPlanta);

            const nomePlanta = document.createElement('p');
            nomePlanta.classList.add('tituloCofre');
            nomePlanta.textContent = nome.charAt(0).toUpperCase() + nome.slice(1);

            plantas[plantasAdicionar].append(plantaCriada);
            prateleira[prateleiraAdicionar].append(nomePlanta);

            plantaPrateleira[plantaPrateleiraAdicionar].append(plantas[plantasAdicionar], prateleira[prateleiraAdicionar]);

            if(periodo == 'Determinado')
            {
                plantaCriada.prepend(addStatus());
            }

            prateleiraItens++;
        }
    }

    if(data == 'dd/mm/aaaa')
    {
        data = null;
    }

    function addStatus()
    {
        const areaStatus = document.createElement('div');
        areaStatus.classList.add('status');
        areaStatus.classList.add('determinado');

        const dataStatus = document.createElement('p');
        dataStatus.textContent = data;

        const determinado = document.createElement('img');
        determinado.src = 'img/timer-icon.svg';

        areaStatus.append(dataStatus, determinado);
        return areaStatus;
    }
}

function informacoesCofre()
{
    const plantas = document.querySelectorAll('.planta');
    let areaConsultarCofre = '';

    for (let i = 0; i < plantas.length; i++) {
        const plantaSelecionada = plantas[i];
        const tituloCofres = document.querySelectorAll('.tituloCofre');

        const imgPlanta = plantaSelecionada.querySelector('.plantaImg');

        plantaSelecionada.addEventListener('click', function(e){
            e.preventDefault();

            
            fetch("http://localhost/Trit/trit/api/listarCofrinhos.php", {
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

                    bloqueio.innerHTML = '';

                    const cofrinho = dadosJSON.cofrinhos[i];

                    areaConsultarCofre = document.createElement('div');
                    areaConsultarCofre.classList.add('popup');
                    areaConsultarCofre.classList.add('areaConsultarCofre');

                    const cofreConsultar = document.createElement('div');
                    cofreConsultar.classList.add('cofreConsultar');

                    const plantaIcon = document.createElement('img');
                    plantaIcon.src = `img/plantas/icons/${cofrinho.Planta.Nome}-icon.svg`;

                    const nomeCofre = document.createElement('p');
                    nomeCofre.textContent = cofrinho.Nome.charAt(0).toUpperCase() + cofrinho.Nome.slice(1);

                    cofreConsultar.append(plantaIcon, nomeCofre);

                    const areaInfos = document.createElement('div');
                    areaInfos.classList.add('infosCofrinho');

                    const areaValorDepositado = document.createElement('div');
                    areaValorDepositado.classList.add('areaInfos');

                    const tituloValorDepositado = document.createElement('p');
                    tituloValorDepositado.textContent = 'Valor atual:';
                    tituloValorDepositado.classList.add('tituloInfos');

                    const valorDepositado = document.createElement('div');
                    valorDepositado.classList.add('valor');
                    
                    const valorDepositadoMoeda = document.createElement('p');
                    valorDepositadoMoeda.textContent = 'R$';

                    const valorDepositadoReal = document.createElement('p');
                    valorDepositadoReal.textContent = String(cofrinho.ValorAtual).replaceAll('.',',');
                

                    valorDepositado.append(valorDepositadoMoeda, valorDepositadoReal);
                    areaValorDepositado.append(tituloValorDepositado, valorDepositado);

                    const areaValorLimite = document.createElement('div');
                    areaValorLimite.classList.add('areaInfos');

                    const tituloValorLimite = document.createElement('p');
                    tituloValorLimite.textContent = 'Valor limite:';
                    tituloValorLimite.classList.add('tituloInfos');

                    const valorLimite = document.createElement('div');
                    valorLimite.classList.add('valor');
                    
                    const valorLimiteMoeda = document.createElement('p');
                    valorLimiteMoeda.textContent = 'R$';

                    const valorLimiteReal = document.createElement('p');
                    valorLimiteReal.textContent = String(cofrinho.ValorFinal).replaceAll('.',',');

                    valorLimite.append(valorLimiteMoeda, valorLimiteReal);
                    areaValorLimite.append(tituloValorLimite, valorLimite);

                    const areaDataCriacao = document.createElement('div');
                    areaDataCriacao.classList.add('areaInfos');

                    const tituloDataCriacao = document.createElement('p');
                    tituloDataCriacao.textContent = 'Data:';
                    tituloDataCriacao.classList.add('tituloInfos');
                    // data 
                    let dataAtual = cofrinho.Data;
                    let conjuntoDataAtual = dataAtual.split("-");
                    
                    let dataAtualFormatada = `${conjuntoDataAtual[2]}-${conjuntoDataAtual[1]}-${conjuntoDataAtual[0]}`;
                    let dataPrazoFormatada = 0;

                    if(cofrinho.Prazo){

                        let dataPrazo = cofrinho.Prazo;
                        let conjuntoDataPrazo = dataPrazo.split("-");
                        dataPrazoFormatada = `${conjuntoDataPrazo[2]}-${conjuntoDataPrazo[1]}-${conjuntoDataPrazo[0]}`;
                    }

                    const dataCriacao = document.createElement('p');
                    dataCriacao.textContent = dataAtualFormatada.replaceAll('-', '/');

                    areaDataCriacao.append(tituloDataCriacao, dataCriacao);

                    const areaPeriodo = document.createElement('div');
                    areaPeriodo.classList.add('areaInfos');

                    const tituloPeriodo = document.createElement('p');
                    tituloPeriodo.textContent = 'Período:';
                    tituloPeriodo.classList.add('tituloInfos');

                    const tipoPeriodo = document.createElement('p');
                    tipoPeriodo.textContent = cofrinho.tipo;

                    // cofrinho.tipo.charAt(0).toUpperCase() + cofrinho.tipo.slice(1);

                    areaPeriodo.append(tituloPeriodo, tipoPeriodo);

                    let areaDica = '';
                    let areaDataLimite = '';

                    if(dataPrazoFormatada)
                    {
                        let diaAtual = dataAtualFormatada.replaceAll('-','');
                        diaAtual = diaAtual.slice(0,2);
                        
                        let mesAtual = dataAtualFormatada.replaceAll('-','');
                        mesAtual = mesAtual.slice(2,4);

                        let anoAtual = dataAtualFormatada.replaceAll('-','');
                        anoAtual = anoAtual.slice(4);

                        let diaLimite = dataPrazoFormatada.replaceAll('-','');
                        diaLimite = diaLimite.slice(0,2);

                        let mesLimite = dataPrazoFormatada.replaceAll('-','');
                        mesLimite = mesLimite.slice(2,4);

                        let anoLimite = dataPrazoFormatada.replaceAll('-','');
                        anoLimite = anoLimite.slice(4);

                        let diferencaAno = anoLimite - anoAtual;
                        let diferencaMes = mesLimite - mesAtual;
                        diferencaMes = diferencaMes + (diferencaAno * 12);

                        if(diaAtual > diaLimite)
                        {
                            diferencaMes--;
                        }

                        let valorPorMes = Number(cofrinho.ValorFinal) / diferencaMes;
                        valorPorMes = Math.ceil(valorPorMes * Math.pow(10,2)) / Math.pow(10,2);
                        valorPorMes = valorPorMes.toFixed(2).replace('.',',');

                        areaDataLimite = document.createElement('div');
                        areaDataLimite.classList.add('areaInfos');

                        const tituloDataLimite = document.createElement('p');
                        tituloDataLimite.textContent = 'Data limite:';
                        tituloDataLimite.classList.add('tituloInfos');

                        const dataLimite = document.createElement('p');
                        dataLimite.textContent = dataPrazoFormatada.replaceAll('-', '/');
                        dataLimite.id = 'dataLimite';

                        areaDataLimite.append(tituloDataLimite, dataLimite);
                        areaInfos.appendChild(areaDataLimite);

                        areaDica = document.createElement('div');
                        areaDica.classList.add('areaDica');

                        const fundoDica = document.createElement('img');
                        fundoDica.src = 'img/fundoDica.svg';
                        fundoDica.classList.add('fundoDica');

                        const dica = document.createElement('p');
                        dica.textContent = '*Caso junte R$' + valorPorMes + ' por mês baterá sua meta com tranqulidade!';
                        dica.classList.add('dica');

                        const avisoIcon = document.createElement('img');
                        avisoIcon.src = 'img/aviso-icon.svg';
                        avisoIcon.classList.add('avisoIcon');

                        areaDica.append(fundoDica, dica, avisoIcon);
                    }

                    areaInfos.append(areaValorDepositado, areaValorLimite, areaDataCriacao, areaDataLimite, areaPeriodo);

                    const areaBotoes = document.createElement('div');
                    areaBotoes.classList.add('areaBotoes');

                    const btnGuardar = document.createElement('button');
                    btnGuardar.textContent = 'Guardar';
                    btnGuardar.classList.add('btnGuardar');
                    btnGuardar.classList.add('btnAlteraValor');

                    const btnResgatar = document.createElement('button');
                    btnResgatar.textContent = 'Resgatar';
                    btnResgatar.classList.add('btnResgatar');
                    btnResgatar.classList.add('btnAlteraValor');

                    areaBotoes.append(btnGuardar, btnResgatar);

                    const areaConfig = document.createElement('div');
                    areaConfig.classList.add('areaConfig');

                    const btnEditar = document.createElement('div');
                    btnEditar.classList.add('btnEditar');

                    const editarIcon = document.createElement('img');
                    editarIcon.src = 'img/editar.svg';

                    const editar = document.createElement('p');
                    editar.textContent = 'Editar dados';

                    btnEditar.append(editarIcon, editar);

                    const btnExcluir = document.createElement('div');
                    btnExcluir.classList.add('btnExcluir');

                    const excluirIcon = document.createElement('img');
                    excluirIcon.src = 'img/excluir.svg';

                    const excluir = document.createElement('p');
                    excluir.textContent = 'Excluir';

                    btnExcluir.append(excluirIcon, excluir);

                    areaConfig.append(btnEditar, btnExcluir);

                    btnSair = botaoSair();
                    btnSair.classList.add('btnSairPosicao');

                    btnSair.addEventListener('click', function(e){
                        e.preventDefault();
        
                        areaConsultarCofre.remove();
                        bloqueio.remove();
                    })

                    areaConsultarCofre.append(btnSair, cofreConsultar, areaInfos, areaDica, areaBotoes, areaConfig);
                    bloqueio.appendChild(areaConsultarCofre);

                    if(plantaSelecionada.querySelector('.concluida'))
                    {
                        if(sessionStorage.getItem(cofrinho.Codigo) != 'confirmada'){

                            bloqueio.innerHTML = '';
            
                            const areaAvisoConcluida = document.createElement('div');
                            areaAvisoConcluida.classList.add('popup');
                            areaAvisoConcluida.classList.add('areaAviso');
                            areaAvisoConcluida.classList.add('comemorativo');
            
                            const aviso = document.createElement('p');
                            aviso.textContent = 'Parabéns! Essa meta foi concluída.'
            
                            const btnOk = document.createElement('button');
                            btnOk.classList.add('btnOk');
                            btnOk.textContent = 'Ok';
            
                            areaAvisoConcluida.append(aviso, btnOk);
                            bloqueio.appendChild(areaAvisoConcluida);
                            body.appendChild(bloqueio);
            
                            btnOk.addEventListener('click', function(e){
                                e.preventDefault();
            
                                areaAvisoConcluida.remove();
                                bloqueio.remove();
                                
                                const notificaConcluida = document.querySelectorAll('.concluida');
                                plantaSelecionada.setAttribute('status', 'confirmada');
                                sessionStorage.setItem(cofrinho.Codigo, plantaSelecionada.getAttribute('status'));
                                plantaSelecionada.querySelector('.concluida').remove();
    
                                for (let index = 0; index < notificaConcluida.length; index++) {
                                    const notificacao = notificaConcluida[index];
                                    console.log(notificacao);
    
                                    if(notificacao.id == i)
                                    {
                                        notificacao.remove();
                                    }
                                }
                                
                            })  
                            
                            return;
                        }
                    }
                
                    body.appendChild(bloqueio);
        
                    const btnAlteraValor = document.querySelectorAll('.btnAlteraValor');
                    
        
                    for (let index = 0; index < btnAlteraValor.length; index++) {
                    
                        btnAlteraValor[index].addEventListener('click', function(e){
                            e.preventDefault();
        
                            areaConsultarCofre.remove();
                            bloqueio.innerHTML = '';
        
                            const areaAlterarValor = document.createElement('div');
                            areaAlterarValor.classList.add('popup');
        
                            const areaTitulo = document.createElement('div');
                            areaTitulo.classList.add('areaTitulo');
        
                            const tituloAlterar = document.createElement('p');
                            tituloAlterar.classList.add('titulo');
                            tituloAlterar.classList.add('tituloPopup');
        
                            if(btnAlteraValor[index].textContent == 'Guardar')
                            {
                                tituloAlterar.textContent = 'Guardar valor';
                            }
                            else
                            {
                                tituloAlterar.textContent = 'Resgatar valor';
                            }
        
                            btnSair = botaoSair();
        
                            areaTitulo.append(tituloAlterar, btnSair);
        
                            const areaInfos = document.createElement('div');
                            areaInfos.classList.add('infos');
        
                            const areaValor = document.createElement('div');
                            areaValor.classList.add('areaDigitar');
        
                            const labelValor = document.createElement('label');
                            labelValor.textContent = 'Valor:';
        
                            const areaLeft = document.createElement('div');
                            areaLeft.classList.add('areaLeft');
        
                            const txtValor = document.createElement('input');
                            txtValor.type = 'text';
                            txtValor.inputMode = 'numeric';
                            txtValor.value = '0,00';
                            txtValor.classList.add('recuoPopup');
                            txtValor.classList.add('inputMoeda');
        
                            const moeda = document.createElement('p');
                            moeda.textContent = 'R$';
                            moeda.classList.add('moeda');
        
                            formataInputValor(txtValor, null);
        
                            areaLeft.append(txtValor, moeda);
                            areaValor.append(labelValor, obrigatorioIcon(areaLeft));
                            areaInfos.appendChild(areaValor);
        
                            const btnSalvar = document.createElement('button');
                            btnSalvar.textContent = 'Salvar';
                            btnSalvar.classList.add('btnSalvar');
        
                            areaAlterarValor.append(areaTitulo, areaInfos, btnSalvar);
                            bloqueio.appendChild(areaAlterarValor);
        
                            btnSair.addEventListener('click', function(e){
                                e.preventDefault();
        
                                areaAlterarValor.remove();
                                bloqueio.appendChild(areaConsultarCofre)
                            })
        
                            btnSalvar.addEventListener('click', function(e){
                                e.preventDefault();
        
                                if(txtValor.value == '' || txtValor.value == '0,00')
                                {
                                    erro(msgErro, txtValor, 'Valor não foi informado!', areaInfos);
                                    return;
                                }
        
                                let valorDigitado = txtValor.value;
                                valorDigitado = valorDigitado.replace(',', '.');
                                valorDigitado = Number(valorDigitado);
        
                                let valorPossui = valorDepositadoReal.textContent;
                                valorPossui = valorPossui.replace(',', '.');
                                valorPossui = Number(valorPossui);
        
                                let valorMax = valorLimiteReal.textContent;
                                valorMax = valorMax = valorMax.replace(',', '.');
                                valorMax = Number(valorMax);
        
                                let valorTotal = 0;
        
                                if(btnAlteraValor[index].textContent == 'Guardar')
                                {
                                    valorTotal = valorPossui + valorDigitado;
                                    
                                    if(valorPossui < valorMax && valorTotal > valorMax)
                                    {
                                        bloqueio.innerHTML = '';
                                        areaAlterarValor.remove();
        
                                        const areaAviso = document.createElement('div');
                                        areaAviso.classList.add('popup');
                                        areaAviso.classList.add('areaAviso');
        
                                        const aviso = document.createElement('p');
                                        aviso.textContent = 'O valor total ultrapassa o valor limite do cofrinho. Deseja depositar mesmo assim?'
        
                                        const areaBotoesDeposito = document.createElement('div');
                                        areaBotoesDeposito.classList.add('areaBotoesDeposito');
        
                                        const btnDepositar = document.createElement('button');
                                        btnDepositar.classList.add('btnDepositar');
                                        btnDepositar.textContent = 'Depositar';
        
                                        const btnCancelar = document.createElement('button');
                                        btnCancelar.classList.add('btnCancelarDeposito');
                                        btnCancelar.textContent = 'Cancelar';
        
                                        areaBotoesDeposito.append(btnDepositar, btnCancelar)
                                        areaAviso.append(aviso, areaBotoesDeposito);
                                        bloqueio.appendChild(areaAviso);
        
                                        btnDepositar.addEventListener('click', function(e){
                                            e.preventDefault();
        
                                            areaAviso.remove();
                                            bloqueio.appendChild(areaConsultarCofre);
        
                                            valorTotal = valorTotal.toFixed(2);
                                            valorDepositadoReal.textContent = valorTotal.replace('.',',');
                                        
                                        })
        
                                        btnCancelar.addEventListener('click', function(e){
                                            e.preventDefault();
        
                                            areaAviso.remove();
                                            bloqueio.appendChild(areaConsultarCofre);
                                        })
                                    }
                                    else
                                    {
                                        bloqueio.innerHTML = '';
                                        areaAlterarValor.remove();
                                        bloqueio.appendChild(areaConsultarCofre);
                                    }
                                    
                                    fetch("http://localhost/Trit/trit/api/guardarMovimentacao.php", {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(
                                        {
                                            "valor":valorDigitado,
                                            "codigo_cofrinho":cofrinho.Codigo
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
                                            areaAlterarValor.remove();
                                            bloqueio.appendChild(areaConsultarCofre);
                                            main.querySelector('.cofrinhos').textContent = '';
                                            prateleiraItens = 2;
                                            exibirCofres();
                                        }
                                    })
                                    .catch(function (error) {
                                        console.warn(error);
                                    });
                                }
                                else
                                {
                                    bloqueio.innerHTML = '';
                                    if(valorDigitado > valorPossui)
                                    {
                                        erro(msgErro, txtValor, 'Saldo insuficiente!', areaInfos);
                                        return;
                                    }

                                    valorTotal = valorPossui - valorDigitado;
                                    valorTotal = valorTotal.toFixed(2);
                                    fetch("http://localhost/Trit/trit/api/resgatarMovimentacao.php", {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(
                                        {
                                            "valor":valorDigitado,
                                            "codigo_cofrinho":cofrinho.Codigo
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
                                            areaAlterarValor.remove();
                                            bloqueio.appendChild(areaConsultarCofre);
                                            main.querySelector('.cofrinhos').textContent = '';
                                            prateleiraItens = 2;
                                            exibirCofres();
                                        }
                                    })
                                    .catch(function (error) {
                                        console.warn(error);
                                    });

                                    areaAlterarValor.remove();
                                    bloqueio.appendChild(areaConsultarCofre);
                                }

                                let valorExibir = Number(valorTotal).toFixed(2);
                                valorDepositadoReal.textContent = String(valorExibir).replace('.',',');
                                ajustaPercentual(valorTotal, valorMax, plantaSelecionada, cofrinho.Planta.Nome, imgPlanta, i, cofrinho.Codigo);
                            })
                        })
        
                    }
        
                    btnEditar.addEventListener('click', function(e){
                        e.preventDefault();
        
                        bloqueio.innerHTML = '';
                        areaConsultarCofre.remove();
        
                        const areaEditarDados = document.createElement('div');
                        areaEditarDados.classList.add('popup');
        
                        const areaTitulo = document.createElement('div');
                        areaTitulo.classList.add('areaTitulo');
        
                        const tituloEditar = document.createElement('p');
                        tituloEditar.textContent = 'Editar dados';
                        tituloEditar.classList.add('titulo');
                        tituloEditar.classList.add('tituloPopup');
        
                        btnSair = botaoSair();
        
                        areaTitulo.append(tituloEditar, btnSair);
        
                        const areaInfos = document.createElement('div');
                        areaInfos.classList.add('infos');

                        const areaNome = document.createElement('div');
                        areaNome.classList.add('areaDigitar');
    
                        const labelNome = document.createElement('label');
                        labelNome.textContent = 'Nome:';
    
                        const txtNome = document.createElement('input');
                        txtNome.type = 'text';
                        txtNome.value = cofrinho.Nome;

                        areaNome.appendChild(labelNome);
                        areaNome.appendChild(txtNome);
        
                        const areaValorLimite = document.createElement('div');
                        areaValorLimite.classList.add('areaDigitar');
        
                        const labelValorLimite = document.createElement('label');
                        labelValorLimite.textContent = 'Valor limite:';
        
                        const areaLeft = document.createElement('div');
                        areaLeft.classList.add('areaLeft');
        
                        const txtValorLimite = document.createElement('input');
                        txtValorLimite.type = 'text';
                        txtValorLimite.inputMode = 'numeric';
                        txtValorLimite.value = valorLimiteReal.textContent;
                        txtValorLimite.classList.add('inputMoeda');
        
                        const moeda = document.createElement('p');
                        moeda.textContent = 'R$';
                        moeda.classList.add('moeda');
        
                        formataInputValor(txtValorLimite, valorLimiteReal.textContent);
        
                        areaLeft.append(txtValorLimite, moeda);
                        areaValorLimite.append(labelValorLimite, areaLeft);
                        areaInfos.appendChild(areaNome);
                        areaInfos.appendChild(areaValorLimite);
        
                        if(cofrinho.Prazo)
                        {
                            const areaData = document.createElement('div');
                            areaData.classList.add('areaDigitar');

                            const labelData = document.createElement('label');
                            labelData.textContent = 'Data limite:';
        
                            const txtData = document.createElement('input');
                            txtData.type = 'text';
                            txtData.inputMode = 'numeric';
                            txtData.id = 'txtData';
                            txtData.value = areaDataLimite.querySelector('#dataLimite').textContent;
        
                            areaData.append(labelData, txtData);
                            areaInfos.appendChild(areaData);
        
                            formataInputData(txtData, txtData.value.replaceAll('/',''));
                        }
        
                        const btnSalvar = document.createElement('button');
                        btnSalvar.textContent = 'Salvar';
                        btnSalvar.classList.add('btnSalvar');
        
                        areaEditarDados.append(areaTitulo, areaInfos, btnSalvar);
                        bloqueio.appendChild(areaEditarDados);
        
                        btnSair.addEventListener('click', function(e){
                            e.preventDefault();
        
                            areaEditarDados.remove();
                            bloqueio.appendChild(areaConsultarCofre);
                        })
        
                        btnSalvar.addEventListener('click', function(e){
                            e.preventDefault();
        
                            let txtData = null;
        
                            if(txtValorLimite.value == '' || txtValorLimite.value == '0,00')
                            {
                                erro(msgErro, txtValorLimite, 'Valor limite não foi informado!', areaInfos);
                                return;
                            }
        
                            if(document.querySelector('#txtData'))
                            {
                                txtData = document.querySelector('#txtData');
        
                                let erroEncontrado = '';
                                erroEncontrado = validaData(msgErro, txtData, areaInfos);
        
                                if(erroEncontrado)
                                {
                                    return;
                                }
                                areaDataLimite.querySelector('#dataLimite').textContent = txtData.value;
                            }
        
                            valorLimiteReal.textContent = txtValorLimite.value;

                            let valorEnviar = String(txtValorLimite.value).replaceAll(',','.');
                            valorEnviar = Number(valorEnviar);

                            let dataEnviar = null;
                            if(txtData){
                                dataEnviar = FormatarData(txtData);
                            }
        
                            fetch("http://localhost/Trit/trit/api/editarCofrinho.php", {
                            method: "PUT",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(
                                {
                                    "codigo":cofrinho.Codigo,
                                    "nome":String(txtNome.value),
                                    "valor_final":valorEnviar,
                                    "prazo":dataEnviar,
                                    "codigo_planta":cofrinho.Planta.Codigo 
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
                                    bloqueio.remove()
                                    areaEditarDados.remove();
                                    main.querySelector('.cofrinhos').textContent = '';
                                    prateleiraItens = 2;
                                    exibirCofres();
                                } 
                            })
                            .catch(function (error) {
                                console.warn(error);
                            })

                        })
                        
                    })
        
                    btnExcluir.addEventListener('click',function(e){
                        e.preventDefault();
        
                        bloqueio.innerHTML = '';
                        areaConsultarCofre.remove();
        
                        const areaAviso = document.createElement('div');
                        areaAviso.classList.add('popup');
                        areaAviso.classList.add('areaAviso');
        
                        const aviso = document.createElement('p');
                        aviso.textContent = 'Gostaria de excluir esse cofrinho?'
        
                        const areaBotoesExcluir = document.createElement('div');
                        areaBotoesExcluir.classList.add('areaBotoesExcluir');
        
                        const btnCancelar = document.createElement('button');
                        btnCancelar.classList.add('btnCancelar');
                        btnCancelar.textContent = 'Cancelar';
                        btnCancelar.classList.add('btnCancelar');
        
                        const btnExcluirConfirma = document.createElement('button');
                        btnExcluirConfirma.classList.add('btnExcluirConfirma');
                        btnExcluirConfirma.textContent = 'Excluir';
        
                        areaBotoesExcluir.append(btnCancelar, btnExcluirConfirma);
                        areaAviso.append(aviso, areaBotoesExcluir);
                        bloqueio.appendChild(areaAviso);
        
                        btnCancelar.addEventListener('click', function(e){
                            e.preventDefault();
        
                            areaAviso.remove();
                            bloqueio.appendChild(areaConsultarCofre);
                        });
        
                        btnExcluirConfirma.addEventListener('click', function(e){
                            e.preventDefault();
        
                            areaAviso.remove();
                            bloqueio.remove();
                                
                            if(plantaSelecionada.getAttribute('codigo') == tituloCofres[i].getAttribute('codigo'));
                            {
                                tituloCofres[i].remove();
                            }
                            
                            const parametro = new URLSearchParams({
                                codigo : plantaSelecionada.getAttribute('id')
                            });
        
                            fetch("http://localhost/Trit/trit/api/deletarCofrinho.php?"+parametro, {
                            method: "DELETE",
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
                                    main.querySelector('.cofrinhos').textContent = '';
                                    prateleiraItens = 2;
                                    exibirCofres();
                                }
                            })
                            .catch(function (error) {
                                console.warn(error);
                            });
                        })
        
                    })
                }
            })
            .catch(function (error) {
                console.warn(error);
            })
            .finally(function () {
            });
        })
    }
}

function ajustaPercentual(valorTotal, valorMax, local, nomePlanta, img, idNotificacao, codigo){
    const porcentagemPlanta = local.querySelector('.porcentagem');
    let porcentagemBruta = String(porcentagemPlanta.textContent).split('%');
    let percentual = Number(porcentagemBruta[0]);
    let qualImagem = 0;
    let posicaoStatus = ''
    if(valorTotal && valorMax){
        percentual = (valorTotal * 100) / valorMax;
    }

    if(percentual >= 100)
    {
        porcentagemPlanta.textContent = '100%';
        porcentagemPlanta.style.color = 'rgb(157, 235, 125)';

        if(sessionStorage.getItem(codigo) != 'confirmada'){
            const statusConcluida = document.createElement('img');
            statusConcluida.classList.add('concluida');
            statusConcluida.src = 'img/aviso-icon.svg';
            statusConcluida.classList.add('status');
            statusConcluida.id = idNotificacao;
    
            local.prepend(statusConcluida);
        }

        // fetch para somar um ao total de metas concluidas pelo user
    }
    else
    {
        porcentagemPlanta.textContent = percentual.toFixed(0) + '%';
    }

    if(percentual < 20)
    {
        qualImagem = 1;
        // posicaoStatus = '60px';
    }
    else
    {
        if(percentual >= 20 && percentual < 40)
        {
            qualImagem = 2;
            // posicaoStatus = '28px';
        }
        else
        {
            if(percentual >= 40 && percentual < 60)
            {
                qualImagem = 3;
                // posicaoStatus = '5px';
            }
            else
            {
                if(percentual >= 60 && percentual < 80)
                {
                    qualImagem = 4;
                    // posicaoStatus = '0px';
                }
                else
                {
                    qualImagem = 5;
                    // posicaoStatus = '0px';
                }

            }
        }
    }

    img.setAttribute('src', 'img/plantas/' + nomePlanta + '/' + nomePlanta + '-f' + qualImagem + '.svg');
    const statusDeterminado = document.querySelector('.determinado');
    if(statusDeterminado)
    {
        statusDeterminado.style.top = posicaoStatus;
    }
}