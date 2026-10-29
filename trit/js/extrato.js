const btnExtrato = document.querySelector('#btnExtrato');
const btnGraficos = document.querySelector('#btnGraficos');
const areaDias = document.querySelector('section');

btnExtrato.addEventListener('click', function(e){
    e.preventDefault();

    btnExtrato.classList.add('opcaoSelecionadaMenu');
    btnGraficos.classList.remove('opcaoSelecionadaMenu');
})

btnGraficos.addEventListener('click', function(e){
    e.preventDefault();

    btnGraficos.classList.add('opcaoSelecionadaMenu');
    btnExtrato.classList.remove('opcaoSelecionadaMenu');
})

const areaFiltros = document.querySelector('.filtros');
areaFiltros.append(areaSelecaoAno(), areaSelecaoMes());
let anoFiltro = areaFiltros.querySelector('.anoSelecionado').textContent;
anoFiltro = Number(anoFiltro);

let mesFiltro = areaFiltros.querySelector('.mesSelecionado').textContent;
mesFiltro = qualNumero(mesFiltro);

fetch("http://localhost/Trit/trit/api/listarExtrato.php", {
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
    if(dadosJSON.extrato.length > 0){
        exibirExtrato(dadosJSON.extrato);
    }else{
        const semRegistros = document.createElement('p');
        semRegistros.textContent = 'Nenhum registro para essa data';
        semRegistros.classList.add('semRegistros');

        areaDias.appendChild(semRegistros);
    }
}
})
.catch(function (error) {
    console.warn(error);
});

// const dias = document.querySelectorAll('.dia');
// if(dias.length == 0)
// {
//     const semRegistros = document.createElement('p');
//     semRegistros.textContent = 'Nenhum registro para essa data';
//     semRegistros.classList.add('semRegistros');

//     areaDias.appendChild(semRegistros);
// }


function areaSelecaoMes()
{
    const selecionarMes = document.createElement('div');
    selecionarMes.classList.add('selecionar');

    const areaMesSelecionado = document.createElement('div');
    areaMesSelecionado.classList.add('areaOpcaoSelecionada');

    const mesSelecionado = document.createElement('p');
    mesSelecionado.classList.add('opcao');
    mesSelecionado.classList.add('opcaoSelecionada');
    mesSelecionado.classList.add('mesSelecionado');
    mesSelecionado.textContent = 'Tudo';

    const btnMaisOpcoes = document.createElement('button');
    btnMaisOpcoes.classList.add('btnMaisOpcoes');

    const iconMaisOpcoes = document.createElement('img');
    iconMaisOpcoes.src = "img/seta.svg";
    iconMaisOpcoes.classList.add('maisOpcoes');

    const naoSelecionado = document.createElement('div');
    naoSelecionado.classList.add('naoSelecionado');

    btnMaisOpcoes.appendChild(iconMaisOpcoes);
    areaMesSelecionado.append(mesSelecionado, btnMaisOpcoes);

    const meses = ['Tudo', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    for (let i = 0; i < meses.length; i++) {
        
        const mes = document.createElement('p');
        mes.classList.add('opcao');
        mes.classList.add('mesEscolher');
        mes.textContent = meses[i];

        if(i == 0)
        {
            mes.style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
        }

        if(i == 12)
        {
            mes.style.borderBottom = 'none';
        }
        
        naoSelecionado.append(mes);
    }

    selecionarMes.append(areaMesSelecionado, naoSelecionado);

    let abaAberta = false;
    let opcoes = '';

    btnMaisOpcoes.addEventListener('click', function(e){

        abaOpcoes();
        
        opcoes = document.querySelectorAll('.mesEscolher');

        for (let i = 0; i < opcoes.length; i++) {
            const opcaoAtual = opcoes[i];
            let txtOpcaoAtual = opcaoAtual.textContent;

            opcaoAtual.addEventListener('click', function(e){

                mesSelecionado.textContent = txtOpcaoAtual;
                selecionada();
                let anoFiltro = areaFiltros.querySelector('.anoSelecionado').textContent;
                anoFiltro = Number(anoFiltro);

                let mesFiltro = mesSelecionado.textContent;
                mesFiltro = qualNumero(mesFiltro);

                const parametro = new URLSearchParams({
                    mes: mesFiltro,
                    ano: anoFiltro
                });
                fetch("http://localhost/Trit/trit/api/listarExtrato.php?"+parametro, {
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
                    if(dadosJSON.extrato.length > 0){
                        document.querySelector('section').textContent = '';
                        exibirExtrato(dadosJSON.extrato);
                    }else{
                        document.querySelector('section').textContent = '';
                        const semRegistros = document.createElement('p');
                        semRegistros.textContent = 'Nenhum registro para essa data';
                        semRegistros.classList.add('semRegistros');

                        areaDias.appendChild(semRegistros);
                    }
                }
                })
                .catch(function (error) {
                    console.warn(error);
                });


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
            selecionarMes.classList.add('ajustaBorda');

            abaAberta = true;
        }
        else
        {
            naoSelecionado.style.display = 'none';
            iconMaisOpcoes.style.transform = 'rotate(90deg)';
            selecionarMes.classList.remove('ajustaBorda');

            abaAberta = false;
        }
    }

    function selecionada()
    {
        const opcoesEscolher = document.querySelectorAll('.mesEscolher');

        for (let i = 0; i < opcoesEscolher.length; i++) {

            opcoesEscolher[i].style.backgroundColor = 'transparent';
            
            if(opcoesEscolher[i].textContent == mesSelecionado.textContent)
            {
                opcoesEscolher[i].style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
            }
        }
    }

    return selecionarMes;
}

function areaSelecaoAno()
{
    const selecionarAno = document.createElement('div');
    selecionarAno.classList.add('selecionar');

    const areaAnoSelecionado = document.createElement('div');
    areaAnoSelecionado.classList.add('areaOpcaoSelecionada');

    const anoSelecionado = document.createElement('p');
    anoSelecionado.classList.add('opcao');
    anoSelecionado.classList.add('opcaoSelecionada');
    anoSelecionado.classList.add('anoSelecionado');
    anoSelecionado.textContent = '2026';

    const btnMaisOpcoes = document.createElement('button');
    btnMaisOpcoes.classList.add('btnMaisOpcoes');

    const iconMaisOpcoes = document.createElement('img');
    iconMaisOpcoes.src = "img/seta.svg";
    iconMaisOpcoes.classList.add('maisOpcoes');

    const naoSelecionado = document.createElement('div');
    naoSelecionado.classList.add('naoSelecionado');

    const ano = document.createElement('p');
    ano.classList.add('opcao');
    ano.classList.add('anoEscolher');
    ano.textContent = '2026';
    ano.style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
    ano.style.borderBottom = 'none';

    btnMaisOpcoes.appendChild(iconMaisOpcoes);
    areaAnoSelecionado.append(anoSelecionado, btnMaisOpcoes);
    naoSelecionado.appendChild(ano);
    selecionarAno.append(areaAnoSelecionado, naoSelecionado);

    let abaAberta = false;
    let opcoes = '';

    btnMaisOpcoes.addEventListener('click', function(e){

        abaOpcoes();
        
        opcoes = document.querySelectorAll('.anoEscolher');

        for (let i = 0; i < opcoes.length; i++) {
            const opcaoAtual = opcoes[i];
            let txtOpcaoAtual = opcaoAtual.textContent;

            opcaoAtual.addEventListener('click', function(e){

                anoSelecionado.textContent = txtOpcaoAtual;
                selecionada();

                let anoFiltro = anoSelecionado.textContent;
                anoFiltro = Number(anoFiltro);

                let mesFiltro = areaFiltros.querySelector('.mesSelecionado').textContent;
                mesFiltro = qualNumero(mesFiltro);

                const parametro = new URLSearchParams({
                    mes: mesFiltro,
                    ano: anoFiltro
                });
                fetch("http://localhost/Trit/trit/api/listarExtrato.php?"+parametro, {
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
                    if(dadosJSON.extrato.length > 0){
                        document.querySelector('section').textContent = '';
                        exibirExtrato(dadosJSON.extrato);
                    }else{
                        document.querySelector('section').textContent = '';
                        const semRegistros = document.createElement('p');
                        semRegistros.textContent = 'Nenhum registro para essa data';
                        semRegistros.classList.add('semRegistros');

                        areaDias.appendChild(semRegistros);
                    }
                }
                })
                .catch(function (error) {
                    console.warn(error);
                });

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
            selecionarAno.classList.add('ajustaBorda');

            abaAberta = true;
        }
        else
        {
            naoSelecionado.style.display = 'none';
            iconMaisOpcoes.style.transform = 'rotate(90deg)';
            selecionarAno.classList.remove('ajustaBorda');

            abaAberta = false;
        }
    }

    function selecionada()
    {
        const opcoesEscolher = document.querySelectorAll('.anoEscolher');

        for (let i = 0; i < opcoesEscolher.length; i++) {

            opcoesEscolher[i].style.backgroundColor = 'transparent';
            
            if(opcoesEscolher[i].textContent == anoSelecionado.textContent)
            {
                opcoesEscolher[i].style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
            }
        }
    }

    return selecionarAno;
}

function exibirExtrato(dados){
    const datasAgrupadas = Object.groupBy(dados, (item) => item.Data);
    for (const [data, diaEspecifico] of Object.entries(datasAgrupadas)){
        let dataTotal = data;
        dataTotal = String(dataTotal).split('-');
        let dia = dataTotal[2];
        let mes = dataTotal[1];
        let ano = dataTotal[0];
        
        const areaDia = document.createElement('div');
        areaDia.classList.add('dia');

            const conjuntoData = document.createElement('div');
                conjuntoData.classList.add('data');
                    const txtDia = document.createElement('p');
                    txtDia.id = 'txtDia';
                    txtDia.textContent = dia;
                conjuntoData.appendChild(txtDia);

                    let texto = document.createElement('p');
                    texto.textContent = 'de';
                conjuntoData.appendChild(texto);

                    const txtMes = document.createElement('p');
                    txtMes.id = 'txtMes';
                    txtMes.textContent = qualMes(mes);
                conjuntoData.appendChild(txtMes);

                    texto = document.createElement('p');
                    texto.textContent = 'de';
                conjuntoData.appendChild(texto);

                    const txtAno = document.createElement('p');
                    txtAno.id = 'txtAno';
                    txtAno.textContent = ano;
                conjuntoData.appendChild(txtAno);
            areaDia.appendChild(conjuntoData);

            const areaExtrato = document.createElement('div');
            areaExtrato.classList.add('areaExtrato');
            criarMovimentacao(areaExtrato, diaEspecifico);

            let saldoTotal = 0;
            const areaSaldo = document.createElement('div');
            areaSaldo.classList.add('saldo');
                const tituloSaldo = document.createElement('p');
                tituloSaldo.textContent = 'Saldo do dia';

                const localValor = document.createElement('div');
                localValor.classList.add('valor');
                    const moeda = document.createElement('p');
                    moeda.textContent = 'R$';
                localValor.appendChild(moeda);

                    const txtSaldo = document.createElement('p');
                    txtSaldo.textContent = saldoTotal;
                localValor.appendChild(txtSaldo);
            areaSaldo.appendChild(tituloSaldo);
            areaSaldo.appendChild(localValor);    
        
        areaDia.appendChild(conjuntoData);
        areaDia.appendChild(areaExtrato);
        areaDia.appendChild(areaSaldo);
        document.querySelector('section').appendChild(areaDia);
    }
}

function criarMovimentacao(local, movimentacoes){
    for (let i = 0; i < movimentacoes.length; i++) {
        const movimentacao = document.createElement('div');
            const nomeMovimentacao = document.createElement('p');
            nomeMovimentacao.textContent = movimentacoes[i].Nome;

            const localValor = document.createElement('div');
            localValor.classList.add('valor');
            
                let txtOrigem = document.createElement('p');
                if(movimentacoes[i].Origem == 'saida'){
                    txtOrigem.textContent = '-';
                    localValor.classList.add('saida');
                }else{
                    if(movimentacoes[i].Origem == 'entrada'){
                        txtOrigem.textContent = '+';
                        localValor.classList.add('entrada');
                    }else{
                        if(movimentacoes[i].Origem == 'guardar'){
                            txtOrigem.textContent = 'Guardou';
                            localValor.classList.add('cofrinho');
                        }else{
                            if(movimentacoes[i].Origem == 'resgatar'){
                                txtOrigem.textContent = 'Resgatou';
                                localValor.classList.add('resgate');
                            }
                        }
                    }
                }
                localValor.appendChild(txtOrigem);

                let moeda = document.createElement('p');
                moeda.textContent = 'R$';
                localValor.appendChild(moeda);

                let txtValor = document.createElement('p');
                let valorFormatado = String(movimentacoes[i].Valor).replaceAll('.',',');
                txtValor.textContent = valorFormatado;
                localValor.appendChild(txtValor);

        movimentacao.appendChild(nomeMovimentacao);
        movimentacao.appendChild(localValor);
        local.appendChild(movimentacao);
    }

}

function qualMes(mes){
    let verificaMes = Number(mes);
    let nomeMes = '';

    switch(verificaMes){
        case 1:
            nomeMes = 'Janeiro';
            break;
        case 2:
            nomeMes = 'Fevereiro';
            break;
        case 3:
            nomeMes = 'Março';
            break;
        case 4:
            nomeMes = 'Abril';
            break;
        case 5:
            nomeMes = 'Maio';
            break;
        case 6:
            nomeMes = 'Junho';
            break;
        case 7:
            nomeMes = 'Julho';
            break;
        case 8:
            nomeMes = 'Agosto';
            break;
        case 9:
            nomeMes = 'Setembro';
            break;
        case 10:
            nomeMes = 'Outubro';
            break;
        case 11:
            nomeMes = 'Novembro';
            break;
        case 12:
            nomeMes = 'Dezembro';
            break;
    }

    return nomeMes;
}

function qualNumero(mes){
    let verificaMes = String(mes);
    let numeroMes = '';

    switch(verificaMes){
        case 'Tudo':
            numeroMes = -1;
            break;
        case 'Janeiro':
            numeroMes = 1;
            break;
        case 'Fevereiro':
            numeroMes = 2;
            break;
        case 'Março':
            numeroMes = 3;
            break;
        case 'Abril':
            numeroMes = 4;
            break;
        case 'Maio':
            numeroMes = 5;
            break;
        case 'Junho':
            numeroMes = 6;
            break;
        case 'Julho':
            numeroMes = 7;
            break;
        case 'Agosto':
            numeroMes = 8;
            break;
        case 'Setembro':
            numeroMes = 9;
            break;
        case 'Outubro':
            numeroMes = 10;
            break;
        case 'Novembro':
            numeroMes = 11;
            break;
        case 'Dezembro':
            numeroMes = 12;
            break;
    }

    return numeroMes;
}