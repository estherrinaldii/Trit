const main = document.querySelector('main');
const body = document.querySelector('body');

if(!document.querySelector('.planta'))
{
    const areaSemCofre = document.createElement('div');
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

const btnAdicionar = document.querySelector('.btnAdicionar');

const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio')

btnAdicionar.addEventListener('click', function(e){
    e.preventDefault();

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

    areaRight = obrigatorioIcon(txtNomeCofre);
    areaNomeCofre.append(labelNomeCofre, areaRight);

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

    areaPeriodo.append(labelPeriodo, areaSelecaoPeriodo(txtDataCofre))
    areaDataCofre.append(labelDataCofre, txtDataCofre);

    const areaValorCofre = document.createElement('div');
    areaValorCofre.classList.add('areaDigitar');

    const labelValorCofre = document.createElement('label');
    labelValorCofre.textContent = 'Valor limite:';

    const txtValorCofre = document.createElement('input');
    txtValorCofre.type = 'number';
    txtValorCofre.classList.add('recuoPopup');

    areaRight = obrigatorioIcon(txtValorCofre);
    areaValorCofre.append(labelValorCofre, areaRight);
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
            erro(txtNomeCofre, 'Nome não foi informado!', areaInfos);
            return;
        }

        if(document.querySelector('.periodoSelecionado').textContent == 'Determinado')
        {
            if(txtDataCofre.value == '')
            {
                erro(txtDataCofre, 'Data não foi informada!', areaInfos);
                return;
            }
        }

        if(txtValorCofre.value == '')
        {
            erro(txtValorCofre, 'Valor limite não foi informado!', areaInfos);
            return;
        }

        if(document.querySelector('.plantaSelecionada').textContent == '- Selecione uma planta -')
        {
            erro(null, 'Selecione uma planta!', areaInfos);
            return;
        }

        areaCriarCofre.remove();
        avisoSair(bloqueio);
    })
})

const plantas = document.querySelectorAll('.planta');

for (let i = 0; i < plantas.length; i++) {
    const plantaSelecionada = plantas[i];
    
    plantaSelecionada.addEventListener('click', function(e){
        e.preventDefault()

        const areaConsultarCofre = document.createElement('div');
        areaConsultarCofre.classList.add('popup');
        areaConsultarCofre.classList.add('areaConsultarCofre');

        const cofreConsultar = document.createElement('div');
        cofreConsultar.classList.add('cofreConsultar');

        const plantaIcon = document.createElement('img');
        plantaIcon.src = 'img/plantas/icons/lirio-icon.svg';

        const nomeCofre = document.createElement('p');
        nomeCofre.textContent = 'Algo muito legal';

        cofreConsultar.append(plantaIcon, nomeCofre);

        const areaInfos = document.createElement('div');
        areaInfos.classList.add('infosCofrinho');

        const areaValorDepositado = document.createElement('div');
        areaValorDepositado.classList.add('areaInfos');

        const tituloValorDepositado = document.createElement('p');
        tituloValorDepositado.textContent = 'Valor atual:';
        tituloValorDepositado.classList.add('tituloInfos');

        const valorDepositado = document.createElement('div');
        valorDepositado.textContent = 'R$ 26,00';

        areaValorDepositado.append(tituloValorDepositado, valorDepositado);

        const areaValorLimite = document.createElement('div');
        areaValorLimite.classList.add('areaInfos');

        const tituloValorLimite = document.createElement('p');
        tituloValorLimite.textContent = 'Valor limite:';
        tituloValorLimite.classList.add('tituloInfos');

        const valorLimite = document.createElement('div');
        valorLimite.textContent = 'R$ 800,00';

        areaValorLimite.append(tituloValorLimite, valorLimite);

        const areaDataCriacao = document.createElement('div');
        areaDataCriacao.classList.add('areaInfos');

        const tituloDataCriacao = document.createElement('p');
        tituloDataCriacao.textContent = 'Data:';
        tituloDataCriacao.classList.add('tituloInfos');

        const dataCriacao = document.createElement('div');
        dataCriacao.textContent = '12/02/2020';

        areaDataCriacao.append(tituloDataCriacao, dataCriacao);

        const areaPeriodo = document.createElement('div');
        areaPeriodo.classList.add('areaInfos');

        const tituloPeriodo = document.createElement('p');
        tituloPeriodo.textContent = 'Período:';
        tituloPeriodo.classList.add('tituloInfos');

        const periodo = document.createElement('div');

        areaPeriodo.append(tituloPeriodo, periodo);
        areaInfos.append(areaValorDepositado, areaValorLimite, areaDataCriacao, areaPeriodo);

        const areaBotoes = document.createElement('div');
        areaBotoes.classList.add('areaBotoes');

        const btnGuardar = document.createElement('button');
        btnGuardar.textContent = 'Guardar';
        btnGuardar.classList.add('btnGuardar');

        const btnResgatar = document.createElement('button');
        btnResgatar.textContent = 'Resgatar';
        btnResgatar.classList.add('btnResgatar');

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

        areaConsultarCofre.append(btnSair, cofreConsultar, areaInfos);

        if(plantaSelecionada.querySelector('.determinado'))
        {
            periodo.textContent = 'Determinado';

            const areaDica = document.createElement('div');
            areaDica.classList.add('areaDica');

            const fundoDica = document.createElement('img');
            fundoDica.src = 'img/fundoDica.svg';
            fundoDica.classList.add('fundoDica');

            const dica = document.createElement('p');
            dica.textContent = '*Caso junte R$' + '500,00' + ' por mês baterá sua meta com tranqulidade!';
            dica.classList.add('dica');

            const avisoIcon = document.createElement('img');
            avisoIcon.src = 'img/aviso-icon.svg';
            avisoIcon.classList.add('avisoIcon');

            areaDica.append(fundoDica, dica, avisoIcon);
            areaConsultarCofre.appendChild(areaDica)

        }
        else
        {
            periodo.textContent = 'Indeterminado';
        }

        areaConsultarCofre.append(areaBotoes, areaConfig);
        bloqueio.appendChild(areaConsultarCofre);
        body.appendChild(bloqueio);

        btnSair.addEventListener('click', function(e){
            e.preventDefault();

            areaConsultarCofre.remove();
            bloqueio.remove();
        })
    })
}

function botaoSair()
{
    const btnSair = document.createElement('button');
    btnSair.classList.add('btnSair');

    const imgSair = document.createElement('img');
    imgSair.src = 'img/sair.png';
    imgSair.alt = 'icone sair';
    imgSair.classList.add('imgSair');

    btnSair.appendChild(imgSair);

    return btnSair;
}

function avisoSair(bloqueio)
{
    const areaAviso = document.createElement('div');
    areaAviso.classList.add('popup');
    areaAviso.classList.add('areaAviso');

    const aviso = document.createElement('p');
    aviso.textContent = 'As alterações não foram salvas.'

    const btnOk = document.createElement('button');
    btnOk.classList.add('btnOk');
    btnOk.textContent = 'Ok';

    areaAviso.append(aviso, btnOk);
    bloqueio.appendChild(areaAviso);

    btnOk.addEventListener('click', function(e){
        e.preventDefault();

        areaAviso.remove();
        bloqueio.remove();
    })
}

function erro(input, mensagem, local){

    const msgErro = document.createElement('p');
    msgErro.classList.add('erro');
    
    if(input)
    {
        input.classList.add('inputErro');
        setTimeout(() => {
            input.classList.remove('inputErro');
        }, 2000); 
    }
    
    if(mensagem)
    {
        msgErro.textContent = mensagem;
        local.appendChild(msgErro);

        setTimeout(() => {
            msgErro.remove();
        }, 2000); 
    }  
}

function obrigatorioIcon(input){

    const areaRight = document.createElement('div');
    areaRight.classList.add('areaRight');

    const obrigatorio = document.createElement('p');
    obrigatorio.textContent = '•'
    obrigatorio.classList.add('obrigatorio');

    areaRight.append(input, obrigatorio);

    input.addEventListener('input', function(e){

        if(input.getAttribute('type') == 'text' || input.getAttribute('type') == 'password')
        {
            if(input.value.trim() != "")
            {
                obrigatorio.remove();
            }
            else
            {
                areaRight.appendChild(obrigatorio);
            }
        }
        else
        {
            if(input.value != "")
            {
                obrigatorio.remove();
            }
            else
            {
                areaRight.appendChild(obrigatorio);
            }
        }
        
    })

    return areaRight;
}

function areaSelecaoPlanta(local)
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
    iconMaisPlantas.src = "img/seta.png";
    iconMaisPlantas.classList.add('maisOpcoes');

    const plantaNaoSelecionada = document.createElement('div');
    plantaNaoSelecionada.classList.add('naoSelecionado');

    const planta1 = document.createElement('div');
    planta1.classList.add('opcao');
    planta1.classList.add('plantasEscolher');
    
    const planta1Img = document.createElement('img');
    planta1Img.src = 'img/plantas/icons/cacto-icon.svg';

    const planta1txt = document.createElement('p');
    planta1txt.textContent = 'Cacto';

    planta1.append(planta1Img, planta1txt);

    const planta2 = document.createElement('div');
    planta2.classList.add('opcao');
    planta2.classList.add('plantasEscolher');
    
    const planta2Img = document.createElement('img');
    planta2Img.src = 'img/plantas/icons/lirio-icon.svg';

    const planta2txt = document.createElement('p');
    planta2txt.textContent = 'Lírio';

    planta2.append(planta2Img, planta2txt);

    const planta3 = document.createElement('div');
    planta3.classList.add('opcao');
    planta3.classList.add('plantasEscolher');
    
    const planta3Img = document.createElement('img');
    planta3Img.src = 'img/plantas/icons/peonia-icon.svg';

    const planta3txt = document.createElement('p');
    planta3txt.textContent = 'Peônia';

    planta3.append(planta3Img, planta3txt);

    const planta4 = document.createElement('div');
    planta4.classList.add('opcao');
    planta4.classList.add('plantasEscolher');
    
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
    iconMaisOpcoes.src = "img/seta.png";
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