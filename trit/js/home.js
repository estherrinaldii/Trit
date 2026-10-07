if(sessionStorage['logado']){
    const galho = document.querySelector('#galho');

    let valorAtualExibir = document.querySelector('#valorAtual');
    let valorTotalExibir = document.querySelector('#valorTotal');

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
        console.log(dadosJSON);
        // A resposta veio SEM erros
        } else {
        // A resposta veio COM erro lógico
        }
    })
    .catch(function (error) {
        console.warn(error);
        // O que fazer se der erro na requisição
    })
    .finally(function () {
        // O que fazer independente de ter dado erro ou não
    });

    let valorAtual = valorAtualExibir.textContent;
    let valorTotal = valorTotalExibir.textContent;

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
    const btnNovaEntrada = document.querySelector('#novaEntrada');

    const msgErro = document.createElement('p');
    msgErro.classList.add('erro');

    const bloqueio = document.createElement('div');
    bloqueio.classList.add('bloqueio');

    btnNovaSaida.addEventListener('click', function(e){
        e.preventDefault();

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
            bloqueio.remove();
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

        btnSalvar.addEventListener('click', function(e){
            e.preventDefault();
            
            if(txtTipoSaida.value == 'Categorizada')
            {

                if(document.querySelector('.areaOpcaoSelecionada').textContent == '- Selecione a categoria -')
                {
                    erro(null, 'Selecione uma categoria!', areaInfos);
                    return;
                }
            }

            if(txtNomeSaida.value == '')
            {
                erro(txtNomeSaida, 'Nome não foi informado!', areaInfos);
                return;
            }

            if(txtDataSaida.value == '')
            {
                erro(txtDataSaida, 'Data não foi informada!', areaInfos);
                return;
            }

            if(txtTipoSaida.value == 'Parcelada')
            {

                if(txtDataLimite.value == '')
                {
                    erro(txtDataLimite, 'Data limite não foi informada!', areaInfos);
                    return; 
                }

                if(txtParcelas.value == '')
                {
                    erro(txtParcelas, 'Número de parcelas não informado!', areaInfos);
                    return;
                }
            }

            if(txtValorSaida.value == '')
            {
                erro(txtValorSaida, 'Valor não foi informado!', areaInfos);
                return;
            }

            // fazer um axios onde
            //
            // as variaveis enviadas são:
            // txtNomeSaida.value (referente ao titulo da saida para o extrato)
            // txtTipoSaida.value (Fixa, Parcelada ou Categorizada)
            // txtDataSaida.value (referente a data q foi realixado o gasto)
            // txtValorSaida.value (referente ao valor gasto)
            // 
            // nessa parte eu recomendo fazer um if que verifica o tipo da saída (Parcelada ou Categorizada, primeira letra maiúscula!)
            // o fixa não precisa pq não tem nenhuma variavel diferente
            // se for categorizada também vai precisar ser enviada a varíavel:
            // document.querySelector('.areaOpcaoSelecionada').textContent (referente a categoria selecionada)
            // se for parcelada, também precisam ser enviadas as variaveis:
            // txtDatalimite.value (eu não lembro pra que serve esse campo bjooo)
            // txtParcelas.value (referente a quantidade de parcelas) 

        })
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
            bloqueio.remove();
        })

        btnSalvar.addEventListener('click', function(e){
            e.preventDefault();

            if(txtNomeEntrada.value == '')
            {
                erro(txtNomeEntrada, 'Nome não foi informado!', areaInfos);
                return;
            }

            if(txtDataEntrada.value == '')
            {
                erro(txtDataEntrada, 'Data não foi informada!', areaInfos);
                return;
            }

            if(txtValorEntrada.value == '')
            {
                erro(txtValorEntrada, 'Valor não foi informado', areaInfos)
                return;
            }

            // fazer um axios onde uma nova entrada é criada para ser salva no extrato
            // as variaveis sao:
            // txtNomeEntrada.value (referente ao nome da entrada)
            // txtDataEntrada.value (referente a data em que o dinheiro foi recebido)
            // txtValorEntrada.value (referente ao valor adicionado)

            valorAtual = valorAtual + Number(txtValorEntrada.value);

            if(!String(valorAtual).includes('.'))
            {
                valorAtual = valorAtual + ',00';
            }

            valorAtualExibir.textContent = valorAtual;

            areaNovaEntrada.remove();
            bloqueio.remove();
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

        const opcaoEscolher = document.createElement('p');
        opcaoEscolher.classList.add('opcao');
        opcaoEscolher.classList.add('opcaoEscolher');
        opcaoEscolher.textContent = 'Lazer';

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
        naoSelecionado.append(opcaoEscolher, btnNovaCategoria);

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

            areaNovaSaida.style.display = 'none';

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
            labelValorLimite.textContent = 'Nome da categoria:';

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
                areaNovaSaida.style.display = 'flex';
            })

            btnSalvar.addEventListener('click', function(e){
                e.preventDefault();

                if(txtNomeCategoria.value == '')
                {
                    erro(txtNomeCategoria, 'Nome não foi informado!', areaInfos);
                    return;
                }

                if(txtValorLimite.value == '')
                {
                    erro(txtValorLimite, 'Valor não foi informado!', areaInfos);
                    return;
                }

                // fazer axios onde

                // é criada uma nova categoria com as variaveis:
                // txtNomeCategoria.value (referente ao nome da categoria)
                // txtValorLimite.value (referente ao valor máximo estabelecido para a categoria)

                let nomeCategoriaAtual = txtNomeCategoria.value.charAt(0).toUpperCase() + txtNomeCategoria.value.slice(1);

                areaNovaCategoria.remove();
                areaNovaSaida.style.display = 'flex';
                opcaoSelecionada.textContent = nomeCategoriaAtual;

                const opcaoCriada = document.createElement('p');
                opcaoCriada.classList.add('opcao');
                opcaoCriada.classList.add('opcaoEscolher');
                opcaoCriada.textContent = nomeCategoriaAtual;

                naoSelecionado.prepend(opcaoCriada);
                selecionada();
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

    function erro(input, mensagem, local){
        
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
}else{
    window.location.href = "http://localhost/trit/login.html";
}