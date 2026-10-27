import { erro, formataInputValor, botaoSair, avisoSair, obrigatorioIcon } from "./funcoes.js";

const body = document.querySelector('body');
const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio');

const msgErro = document.createElement('p');
msgErro.classList.add('erro');

let btnSair = botaoSair();

const btnEditar = document.querySelector('.btnEditar');

if(btnEditar)
{
    btnEditar.addEventListener('click', function(e){
        e.preventDefault();

        bloqueio.innerHTML = '';

        const areaEditarConta = document.createElement('div');
        areaEditarConta.classList.add('popup');

        const areaTitulo = document.createElement('div');
        areaTitulo.classList.add('areaTitulo');

        const tituloEditar = document.createElement('p');
        tituloEditar.textContent = 'Editar perfil';
        tituloEditar.classList.add('tituloMenor');
        tituloEditar.classList.add('tituloPopup');

        areaTitulo.append(tituloEditar, btnSair);

        const areaInfos = document.createElement('div')
        areaInfos.classList.add('infos');

        const areaNome = document.createElement('div');
        areaNome.classList.add('areaDigitar');

        const labelNome = document.createElement('label');
        labelNome.textContent = 'Nome:';

        const txtNome = document.createElement('input');
        txtNome.type = 'text';

        areaNome.append(labelNome, txtNome);

        const areaRenda = document.createElement('div');
        areaRenda.classList.add('areaDigitar');

        const labelRenda = document.createElement('label');
        labelRenda.textContent = 'Renda mensal:';

        const areaLeft = document.createElement('div');
        areaLeft.classList.add('areaLeft');

        const txtRenda = document.createElement('input');
        txtRenda.type = 'text';
        txtRenda.inputMode = 'numeric';
        txtRenda.value = '0,00';
        txtRenda.classList.add('inputMoeda');

        const moeda = document.createElement('p');
        moeda.textContent = 'R$';
        moeda.classList.add('moeda');

        formataInputValor(txtRenda, null);

        areaLeft.append(txtRenda, moeda)
        areaRenda.append(labelRenda, areaLeft);

        areaInfos.append(areaNome, areaRenda);

        const areaEmail = document.createElement('div');
        areaEmail.classList.add('areaInfos');

        const tituloEmail = document.createElement('p');
        tituloEmail.classList.add('tituloInfos');
        tituloEmail.textContent = 'Email:';

        const email = document.createElement('p');
        email.textContent = 'xovilsonkays@gmail.com';

        areaEmail.append(tituloEmail, email);

        const areaOpcoes = document.createElement('div');
        areaOpcoes.classList.add('areaOpcoes');

        const btnAlterarSenha = document.createElement('p');
        btnAlterarSenha.textContent = 'Alterar senha';
        btnAlterarSenha.classList.add('btnAlterarSenha')

        const btnExcluirConta = document.createElement('p');
        btnExcluirConta.textContent = 'Excluir conta';
        btnExcluirConta.classList.add('btnExcluir');

        areaOpcoes.append(btnAlterarSenha, btnExcluirConta);

        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = 'Salvar';
        btnSalvar.classList.add('btnSalvar');

        areaEditarConta.append(areaTitulo, areaInfos, areaEmail, areaOpcoes, btnSalvar);
        bloqueio.appendChild(areaEditarConta);
        body.appendChild(bloqueio);

        btnSair.addEventListener('click', function(e){
            e.preventDefault();

            areaEditarConta.remove();
            avisoSair(bloqueio);
        })

        btnSalvar.addEventListener('click', function(e){
            e.preventDefault();

            if(txtNome.value == '')
            {
                erro(msgErro, txtNome, 'Nome não foi informado!', areaInfos);
                return;
            }

            if(txtRenda.value == '' || txtRenda.value == '0,00')
            {
                erro(msgErro, txtRenda, 'Renda não foi informada!', areaInfos);
                return;
            }
        })
    })
}

const desafios = document.querySelectorAll('.desafio');

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

const btnVoltar = document.querySelector('.btnVoltar')

if(btnVoltar)
{
    btnVoltar.addEventListener('click', function(e){
        e.preventDefault();
        
        window.location.href = "http://localhost/Trit/trit/conta.html";
    })    
}

const tituloExibir = document.querySelector('.areaTituloExibir p');
const paginaGuia = document.querySelector('.paginaGuia');

if(tituloExibir)
{
    let paginaTitulo = localStorage.getItem('qualPagina');

    tituloExibir.textContent = paginaTitulo;
    paginaGuia.textContent = paginaTitulo.toLocaleLowerCase();

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
        imgInsignia.classList.add('naoPossui');

        const nomeInsignia = document.createElement('p');
        nomeInsignia.textContent = 'Alcançar x metas';

        insigniaExibir.append(imgInsignia, nomeInsignia);
        exibirInsignias.appendChild(insigniaExibir);
        
    }
}