if(sessionStorage['logado'] == null || sessionStorage['logado'] == ""){
    window.location.href = "http://localhost/Trit/trit/login.html";
}

import { erro, formataInputValor, botaoSair, avisoSair, obrigatorioIcon, exibirSenha, requisitosSenha, verificarInsignias } from "./funcoes.js";

const body = document.querySelector('body');
const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio');

const nomeUsuario = document.querySelector('.nome');
const nivelAtual = document.querySelector('#nivelAtual');
const proximoNivel = document.querySelector('#proximoNivel');
const tarefasConcluidas = document.querySelector('.tarefasConcluidas');
const progressoConcluidas = document.querySelector('.barraProgresso progress');
const todasInsignias = document.querySelectorAll('.insignia');

fetch("http://localhost/Trit/trit/api/buscarDadosUsuario.php", {
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
        let pontos = Number(dadosJSON.usuario[0].Pontos);
        let nivel = pontos / 15;
        nomeUsuario.textContent = dadosJSON.usuario[0].Nome;
        nivelAtual.textContent = 'Nivel ' + nivel;
        proximoNivel.textContent = 'Nivel ' + (nivel + 1);
        
        let restante = pontos;
        while(restante >= 15){
            restante -= 15;
        }
        tarefasConcluidas.textContent = restante + '/15';
        progressoConcluidas.setAttribute('value', 0);
        progressoConcluidas.setAttribute('max', 15);
    }
  })
  .catch(function (error) {
    console.warn(error);
  });
// for que compara cada item de (todasInsignias) com as insignias que o usuario possui e se ele possuir remove a class (naoPossui)


const msgErro = document.createElement('p');
msgErro.classList.add('erro');

let btnSair = '';
let areaRight = '';

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

        btnSair = botaoSair();

        areaTitulo.append(tituloEditar, btnSair);

        const areaInfos = document.createElement('div')
        areaInfos.classList.add('infos');

        const areaNome = document.createElement('div');
        areaNome.classList.add('areaDigitar');

        const labelNome = document.createElement('label');
        labelNome.textContent = 'Nome:';

        const txtNome = document.createElement('input');
        txtNome.type = 'text';
        txtNome.value = nomeUsuario.textContent;        

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

            nomeUsuario.textContent = txtNome.value.charAt(0).toUpperCase() + txtNome.value.slice(1);

            // fetch editar nome/renda
            // variaveis:
            // txtNome.value
            // txtRenda.value

            areaEditarConta.remove();
            bloqueio.remove();
        })

        btnAlterarSenha.addEventListener('click', function(e){

            areaEditarConta.remove();

            const areaAlterarSenha = document.createElement('div');
            areaAlterarSenha.classList.add('popup');

            const areaTitulo = document.createElement('div');
            areaTitulo.classList.add('areaTitulo');

            const tituloAlterarSenha = document.createElement('p');
            tituloAlterarSenha.textContent = 'Alterar senha';
            tituloAlterarSenha.classList.add('tituloMenor');
            tituloAlterarSenha.classList.add('tituloPopup');

            btnSair = botaoSair();

            areaTitulo.append(tituloAlterarSenha, btnSair);

            const areaInfos = document.createElement('div')
            areaInfos.classList.add('infos');

            const areaSenhaAnterior = document.createElement('div');
            areaSenhaAnterior.classList.add('areaDigitar');

            const labelSenhaAnterior = document.createElement('label');
            labelSenhaAnterior.textContent = 'Senha anterior:';

            const txtSenhaAnterior = document.createElement('input');
            txtSenhaAnterior.type = 'password';
            txtSenhaAnterior.classList.add('inputSenha');
            txtSenhaAnterior.classList.add('recuoPopup');
            
            areaRight = obrigatorioIcon(txtSenhaAnterior);
            areaRight.prepend(exibirSenha(txtSenhaAnterior));

            areaSenhaAnterior.append(labelSenhaAnterior, areaRight);

            const areaNovaSenha = document.createElement('div');
            areaNovaSenha.classList.add('areaDigitar');

            const labelNovaSenha = document.createElement('label');
            labelNovaSenha.textContent = 'Nova senha:';

            const txtNovaSenha = document.createElement('input');
            txtNovaSenha.type = 'password';
            txtNovaSenha.classList.add('inputSenha');
            txtNovaSenha.classList.add('recuoPopup');
            
            areaRight = obrigatorioIcon(txtNovaSenha);
            areaRight.prepend(exibirSenha(txtNovaSenha));

            areaNovaSenha.append(labelNovaSenha, areaRight);

            const areaConfirmaSenha = document.createElement('div');
            areaConfirmaSenha.classList.add('areaDigitar');

            const labelConfirmaSenha = document.createElement('label');
            labelConfirmaSenha.textContent = 'Confirme a senha:';

            const txtConfirmaSenha = document.createElement('input');
            txtConfirmaSenha.type = 'password';
            txtConfirmaSenha.classList.add('inputSenha');
            txtConfirmaSenha.classList.add('recuoPopup');
            
            areaRight = obrigatorioIcon(txtConfirmaSenha);
            areaRight.prepend(exibirSenha(txtConfirmaSenha));

            areaConfirmaSenha.append(labelConfirmaSenha, areaRight);

            const requisitos = document.createElement('div');
            requisitos.classList.add('requisitos');

            const requisito1 = document.createElement('p');
            requisito1.id = 'requisito1'
            requisito1.textContent = 'Mínimo de 8 caracteres';

            const requisito2 = document.createElement('p');
            requisito2.id = 'requisito2'
            requisito2.textContent = 'Requer letra maiúscula';

            const requisito3 = document.createElement('p');
            requisito3.id = 'requisito3'
            requisito3.textContent = 'Requer letra minúscula';

            const requisito4 = document.createElement('p');
            requisito4.id = 'requisito4'
            requisito4.textContent = 'Requer número';

            const requisito5 = document.createElement('p');
            requisito5.id = 'requisito5'
            requisito5.textContent = 'Requer caractér especial';
            
            requisitos.append(requisito1, requisito2, requisito3, requisito4, requisito5);

            txtNovaSenha.addEventListener('input', function(e){
                requisitosSenha(txtNovaSenha.value.trim());
            })

            const btnSalvar = document.createElement('button');
            btnSalvar.textContent = 'Salvar';
            btnSalvar.classList.add('btnSalvar');

            areaInfos.append(areaSenhaAnterior, areaNovaSenha, areaConfirmaSenha, requisitos);

            areaAlterarSenha.append(areaTitulo, areaInfos, btnSalvar);
            bloqueio.appendChild(areaAlterarSenha);

            btnSair.addEventListener('click', function(e){
                e.preventDefault();

                areaAlterarSenha.remove();
                bloqueio.appendChild(areaEditarConta);
            })

            btnSalvar.addEventListener('click', function(e){
                e.preventDefault();

                if(txtSenhaAnterior.value == '')
                {
                    erro(msgErro, txtSenhaAnterior, 'Senha anterior não foi informada!', areaInfos);
                    return;
                }

                if(txtNovaSenha.value == '')
                {
                    erro(msgErro, txtNovaSenha, 'Nova senha não foi informada!', areaInfos);
                    return;
                }

                if(txtConfirmaSenha.value == '')
                {
                    erro(msgErro, txtConfirmaSenha, 'Confirme a senha!', areaInfos);
                    return;
                }

                if(txtSenhaAnterior.value == txtNovaSenha.value)
                {
                    erro(msgErro, txtNovaSenha, 'A senha nova deve ser diferente da anterior!', areaInfos);
                    return;
                }

                if(!requisito1.classList.contains('requisitoAtendido') || !requisito2.classList.contains('requisitoAtendido') || !requisito3.classList.contains('requisitoAtendido') || !requisito4.classList.contains('requisitoAtendido') || !requisito5.classList.contains('requisitoAtendido'))
                {
                    erro(msgErro, txtNovaSenha, null, null);
                    return;
                }

                if(txtNovaSenha.value != txtConfirmaSenha.value)
                {
                    erro(msgErro, txtConfirmaSenha, 'Confirmação de senha incompatível!', areaInfos);
                    return;
                }

                // fetch alterar senha
                // 1. conferir se a senha anterior está certa
                //     variavel: txtSenhaAnterior.value
                //     se nao estiver, da erro: erro(msgErro, txtSenhaAnterior, 'Senha incorreta!', areaInfos);

                // 2. registrar senha nova
                //     variavel: txtNovaSenha.value

                areaAlterarSenha.remove();
                bloqueio.remove();
            })
        })

        btnExcluirConta.addEventListener('click', function(e){

            areaEditarConta.remove();

            const areaAviso = document.createElement('div');
            areaAviso.classList.add('popup');
            areaAviso.classList.add('areaAviso');

            const aviso = document.createElement('p');
            aviso.textContent = 'Gostaria de excluir sua conta?'

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

            let paginaExcluir = 0;

            btnExcluirConfirma.addEventListener('click', function(e){
                e.preventDefault();

                if(paginaExcluir == 0)
                {
                    aviso.remove();

                    const areaInfos = document.createElement('div');
                    areaInfos.classList.add('areaInfos');

                    const areaVerificacao = document.createElement('div');

                    const tituloVerificacao = document.createElement('p');
                    tituloVerificacao.textContent = 'Verificação da senha';
                    tituloVerificacao.classList.add('tituloVerificacao');

                    const dsVerificacao = document.createElement('p');
                    dsVerificacao.textContent = 'Insira sua senha para continuar';
                    dsVerificacao.classList.add('dsVerificacao');

                    areaVerificacao.append(tituloVerificacao, dsVerificacao);

                    const txtSenha = document.createElement('input');
                    txtSenha.type = 'password';
                    txtSenha.classList.add('inputSenha');
                    txtSenha.classList.add('recuoPopup');
                    
                    areaRight = obrigatorioIcon(txtSenha);
                    areaRight.prepend(exibirSenha(txtSenha));

                    areaInfos.append(areaVerificacao, areaRight);
                    areaAviso.prepend(areaInfos);

                    paginaExcluir = 1;
                }
                else
                {
                    // fetch excluir conta
                    // conferir se a senha está certa
                    //     variavel: txtSenha.value
                    //     se nao estiver, da erro: erro(msgErro, txtSenha, 'Senha incorreta!', areaInfos);
                    //     se estiver, exclui a conta


                    areaAviso.remove();
                    bloqueio.remove();
                }
            })

            btnCancelar.addEventListener('click', function(e){
                e.preventDefault();

                areaAviso.remove();
                bloqueio.appendChild(areaEditarConta);
            })
        })
    })
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

        insigniaExibir.append(imgInsignia, nomeInsignia);
        exibirInsignias.appendChild(insigniaExibir);
        
        // fetch exibir insignias
        // definir o nome correto dessa insignia (nomeInsignia.textContent)
        // ver se o usuario possui ela, se sim:
        //     imgInsignia.classList.remove('naoPossui'); 
    }
}

let insignias = verificarInsignias();
console(insignias[0].Codigo);