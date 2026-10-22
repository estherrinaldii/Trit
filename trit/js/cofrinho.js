import { erro, botaoSair, avisoSair, obrigatorioIcon } from "./funcoes.js";

const main = document.querySelector('main');
const body = document.querySelector('body');

let areaSemCofre = '';

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

const msgErro = document.createElement('p');
msgErro.classList.add('erro');

const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio');
let btnSair = botaoSair();

botaoAdicionar();

const plantas = document.querySelectorAll('.planta');

for (let i = 0; i < plantas.length; i++) {
    const plantaSelecionada = plantas[i];
    const tituloCofres = document.querySelectorAll('.tituloCofre');
    
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
        valorDepositado.classList.add('valor');
        
        const valorDepositadoMoeda = document.createElement('p');
        valorDepositadoMoeda.textContent = 'R$';

        const valorDepositadoReal = document.createElement('p');
        valorDepositadoReal.textContent = '26,00';

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
        valorLimiteReal.textContent = '800,00';

        valorLimite.append(valorLimiteMoeda, valorLimiteReal);
        areaValorLimite.append(tituloValorLimite, valorLimite);

        const areaDataCriacao = document.createElement('div');
        areaDataCriacao.classList.add('areaInfos');

        const tituloDataCriacao = document.createElement('p');
        tituloDataCriacao.textContent = 'Data:';
        tituloDataCriacao.classList.add('tituloInfos');

        const dataCriacao = document.createElement('p');
        dataCriacao.textContent = '12/02/2020';

        areaDataCriacao.append(tituloDataCriacao, dataCriacao);

        const areaPeriodo = document.createElement('div');
        areaPeriodo.classList.add('areaInfos');

        const tituloPeriodo = document.createElement('p');
        tituloPeriodo.textContent = 'Período:';
        tituloPeriodo.classList.add('tituloInfos');

        const periodo = document.createElement('p');

        areaPeriodo.append(tituloPeriodo, periodo);

        let areaDica = '';
        let areaDataLimite = '';

        if(plantaSelecionada.querySelector('.determinado'))
        {
            periodo.textContent = 'Determinado';

            areaDataLimite = document.createElement('div');
            areaDataLimite.classList.add('areaInfos');

            const tituloDataLimite = document.createElement('p');
            tituloDataLimite.textContent = 'Data limite:';
            tituloDataLimite.classList.add('tituloInfos');

            const dataLimite = document.createElement('p');
            dataLimite.textContent = '20/10/2027';
            dataLimite.id = 'dataLimite';

            areaDataLimite.append(tituloDataLimite, dataLimite);
            areaInfos.appendChild(areaDataLimite);

            areaDica = document.createElement('div');
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
        }
        else
        {
            periodo.textContent = 'Indeterminado';
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

        areaConsultarCofre.append(btnSair, cofreConsultar, areaInfos, areaDica, areaBotoes, areaConfig);
        bloqueio.appendChild(areaConsultarCofre);
        body.appendChild(bloqueio);

        btnSair.addEventListener('click', function(e){
            e.preventDefault();

            areaConsultarCofre.remove();
            bloqueio.remove();
        })

        const btnAlteraValor = document.querySelectorAll('.btnAlteraValor');

        for (let index = 0; index < btnAlteraValor.length; index++) {
            
            btnAlteraValor[index].addEventListener('click', function(e){
                e.preventDefault();

                areaConsultarCofre.remove();

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

                    let valorTotal = 0;

                    if(btnAlteraValor[index].textContent == 'Guardar')
                    {
                        valorTotal = valorPossui + valorDigitado;

                        let valorMax = valorLimiteReal.textContent;
                        valorMax = valorMax = valorMax.replace(',', '.');
                        valorMax = Number(valorMax);

                        if(valorTotal > valorMax)
                        {
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

                                valorTotal = Number(valorTotal).toFixed(2);
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
                            areaAlterarValor.remove();
                            bloqueio.appendChild(areaConsultarCofre);

                            valorTotal = Number(valorTotal).toFixed(2);
                            valorDepositadoReal.textContent = valorTotal.replace('.',',');
                        }
                    }
                    else
                    {
                        if(valorDigitado > valorPossui)
                        {
                            erro(msgErro, txtValor, 'Saldo insuficiente!', areaInfos);
                            return;
                        }
                        else
                        {
                            areaAlterarValor.remove();
                            bloqueio.appendChild(areaConsultarCofre);

                            valorTotal = valorPossui - valorDigitado;
                            valorTotal = Number(valorTotal).toFixed(2);
                            valorDepositadoReal.textContent = valorTotal.replace('.',',');
                        }
                    }
                })
            })
        }

        btnEditar.addEventListener('click', function(e){
            e.preventDefault();

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
            txtValorLimite.classList.add('recuoPopup');
            txtValorLimite.classList.add('inputMoeda');

            const moeda = document.createElement('p');
            moeda.textContent = 'R$';
            moeda.classList.add('moeda');

            formataInputValor(txtValorLimite, valorLimiteReal.textContent);

            areaLeft.append(txtValorLimite, moeda);
            areaValorLimite.append(labelValorLimite, obrigatorioIcon(areaLeft));
            areaInfos.appendChild(areaValorLimite);

            if(periodo.textContent == 'Determinado')
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
                txtData.classList.add('recuoPopup');

                areaData.append(labelData, obrigatorioIcon(txtData));
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

                if(txtValorLimite.value == '' || txtValorLimite.value == '0,00')
                {
                    erro(msgErro, txtValorLimite, 'Valor limite não foi informado!', areaInfos);
                    return;
                }

                if(document.querySelector('#txtData'))
                {
                    const txtData = document.querySelector('#txtData'); 
                    erroEncontrado = validaData(txtData, areaInfos);

                    if(erroEncontrado)
                    {
                        return;
                    }
                    areaDataLimite.querySelector('#dataLimite').textContent = txtData.value;
                }

                valorLimiteReal.textContent = txtValorLimite.value;

                areaEditarDados.remove();
                bloqueio.appendChild(areaConsultarCofre);
            })

        })

        btnExcluir.addEventListener('click',function(e){
            e.preventDefault();

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
            btnExcluirConfirma.classList.add('btnExcluirConfirma');

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
                
                plantaSelecionada.remove();
            })

        })
    })
}

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
    iconMaisPlantas.src = "img/seta.png";
    iconMaisPlantas.classList.add('maisOpcoes');

    const plantaNaoSelecionada = document.createElement('div');
    plantaNaoSelecionada.classList.add('naoSelecionado');

    const planta1 = document.createElement('div');
    planta1.classList.add('opcao');
    planta1.classList.add('plantasEscolher');
    planta1.setAttribute('planta', 'cacto');
    
    const planta1Img = document.createElement('img');
    planta1Img.src = 'img/plantas/icons/cacto-icon.svg';

    const planta1txt = document.createElement('p');
    planta1txt.textContent = 'Cacto';

    planta1.append(planta1Img, planta1txt);

    const planta2 = document.createElement('div');
    planta2.classList.add('opcao');
    planta2.classList.add('plantasEscolher');
    planta2.setAttribute('planta', 'lirio');
    
    const planta2Img = document.createElement('img');
    planta2Img.src = 'img/plantas/icons/lirio-icon.svg';

    const planta2txt = document.createElement('p');
    planta2txt.textContent = 'Lírio';

    planta2.append(planta2Img, planta2txt);

    const planta3 = document.createElement('div');
    planta3.classList.add('opcao');
    planta3.classList.add('plantasEscolher');
    planta3.setAttribute('planta', 'peonia');
    
    const planta3Img = document.createElement('img');
    planta3Img.src = 'img/plantas/icons/peonia-icon.svg';

    const planta3txt = document.createElement('p');
    planta3txt.textContent = 'Peônia';

    planta3.append(planta3Img, planta3txt);

    const planta4 = document.createElement('div');
    planta4.classList.add('opcao');
    planta4.classList.add('plantasEscolher');
    planta4.setAttribute('planta', 'zamioculca');
    
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

function formataInputValor(input, valorInicial)
{
    let valorDigitado = '';

    if(valorInicial)
    {
        valorDigitado = valorInicial.replace(',','');
    }

    input.addEventListener('keydown', function(e){
        e.preventDefault();

        if (/^\d$/.test(e.key)) 
        {
            valorDigitado += e.key
        }

        if (e.key === 'Backspace') 
        {
            valorDigitado = valorDigitado.slice(0, -1);
        }

        let valorExibir = Number(valorDigitado) / 100;
        valorExibir = valorExibir.toFixed(2);
        valorExibir = String(valorExibir).replace('.',',');

        input.value = valorExibir;
    })
}

function formataInputData(input, valorInicial)
{
    let valorDigitado = '';

    if(valorInicial)
    {
        valorDigitado = valorInicial;
    }

    input.addEventListener('keydown', function(e){
        e.preventDefault();

        if (/^\d$/.test(e.key) && valorDigitado.length < 8) 
        {
            valorDigitado += e.key
        }

        if (e.key === 'Backspace') 
        {
            valorDigitado = valorDigitado.slice(0, -1);
            input.disabled = false;
        }

        let valorExibir = valorDigitado.padEnd(8, ' ');
        valorExibir = valorExibir.slice(0, 2).replace(/ /g, 'd')  + valorExibir.slice(2, 4).replace(/ /g, 'm') +  valorExibir.slice(4, 8).replace(/ /g, 'a');
        valorExibir = valorExibir.slice(0, 2) + '/' + valorExibir.slice(2, 4) + '/' + valorExibir.slice(4);
        
        input.value = valorExibir;
    })
}

function validaData(input, local){
    
    let valorVerificar = input.value.replaceAll('/', '');
    let erroEncontrado = false;

    if(valorVerificar == '' || valorVerificar == 'ddmmaaaa')
    {
        erro(msgErro, input, 'Data não foi informada!', local);
        erroEncontrado = true;
    }
    else
    {
        if(isNaN(valorVerificar))
        {
            erro(msgErro, input, 'Data inválida!', local);
            erroEncontrado = true;
        }
        else
        {
            let dia = valorVerificar.slice(0, 2);
            let mes = valorVerificar.slice(2, 4);
            let ano = valorVerificar.slice(4);

            if(Number(ano) < 2026)
            {
                erro(msgErro, input, 'Data inválida!', local);
                erroEncontrado = true;
            }
            else
            {
                if(Number(mes) > 12)
                {
                    erro(msgErro, input, 'Data inválida!', local);
                    erroEncontrado = true;
                }
                else
                {
                    if(mes == '01' || mes == '03' || mes == '05' || mes == '07' || mes == '08' || mes == '10' || mes == '12')
                    {
                        if(Number(dia) > 31)
                        {
                            erro(msgErro, input, 'Data inválida!', local);
                            erroEncontrado = true;
                        }
                    }
                    else
                    {
                        if(mes == '04' || mes == '06' || mes == '09' || mes == '11')
                        {
                            if(Number(dia) > 30)
                            {
                                erro(msgErro, input, 'Data inválida!', local);
                                erroEncontrado = true;
                            }
                        }
                        else
                        {
                            if(mes == '02')
                            {
                                if(Number(dia) > 29)
                                {
                                    erro(msgErro, input, 'Data inválida!', local);
                                    erroEncontrado = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    return erroEncontrado;
}

function botaoAdicionar()
{
    const btnAdicionar = document.querySelector('.btnAdicionar');

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
                erroEncontrado = validaData(txtDataCofre, areaInfos);
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

            let plantaEnviada = document.querySelector('.plantaSelecionada').getAttribute('planta');

            criarPlanta(txtNomeCofre.value, document.querySelector('.periodoSelecionado').textContent, null, txtValorCofre, plantaEnviada);

            areaCriarCofre.remove();
            bloqueio.remove();
        })
    })
}

function criarPlanta(nome, periodo, data, valor, planta)
{
    let areaAdicionar = '';
    let tituloAdicionar = '';

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
    let prateleiraItens = 2;

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

        const plantaImg = document.createElement('img');
        plantaImg.src = 'img/plantas/' + planta + '/' + planta + '-f1.svg';

        const vasoPlanta = document.createElement('img');
        vasoPlanta.src = 'img/plantas/vaso.svg';

        const porcentagemPlanta = document.createElement('p');
        porcentagemPlanta.classList.add('porcentagem');
        porcentagemPlanta.textContent = '0%'

        plantaCriada.append(plantaImg, vasoPlanta, porcentagemPlanta);

        const nomePlanta = document.createElement('p');
        nomePlanta.classList.add('tituloCofre');
        nomePlanta.textContent = nome.charAt(0).toUpperCase() + nome.slice(1);

        plantas.append(areaAdicionar, plantaCriada);
        prateleira.append(tituloAdicionar, nomePlanta);

        plantaPrateleira.append(plantas, prateleira);
        cofrinhos.appendChild(plantaPrateleira);

        botaoAdicionar();
    }
    else
    {
        console.log('prateleira existe')
        console.log(prateleiraItens)
        let prateleiraCheia = prateleiraItens / 3;
        console.log(prateleiraCheia)

        if(Number.isInteger(prateleiraCheia))
        {
            console.log('inteiro')
        }
        else
        {
            console.log('decimal')
            const plantaPrateleira = document.querySelectorAll('.plantaprateleira');
            const plantas = document.querySelectorAll('.plantas');
            const prateleira = document.querySelectorAll('.prateleira');

            const plantaPrateleiraAdicionar = plantaPrateleira.length - 1;
            const plantasAdicionar = plantas.length - 1;
            const prateleiraAdicionar = prateleira.length - 1;

            const plantaCriada = document.createElement('div');
            plantaCriada.classList.add('planta');

            const plantaImg = document.createElement('img');
            plantaImg.src = 'img/plantas/' + planta + '/' + planta + '-f1.svg';

            const vasoPlanta = document.createElement('img');
            vasoPlanta.src = 'img/plantas/vaso.svg';

            const porcentagemPlanta = document.createElement('p');
            porcentagemPlanta.classList.add('porcentagem');
            porcentagemPlanta.textContent = '0%'

            plantaCriada.append(plantaImg, vasoPlanta, porcentagemPlanta);

            const nomePlanta = document.createElement('p');
            nomePlanta.classList.add('tituloCofre');
            nomePlanta.textContent = nome.charAt(0).toUpperCase() + nome.slice(1);

            plantas[plantasAdicionar].appendChild(plantaCriada);
            prateleira[prateleiraAdicionar].appendChild(nomePlanta);

            plantaPrateleira[plantaPrateleiraAdicionar].append(plantas, prateleira);
        }
    }
}