if(sessionStorage['logado'] == null || sessionStorage['logado'] == ""){
    window.location.href = "http://localhost/Trit/trit/login.html";
}

import { deslogar } from "./funcoes.js";

const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio');

deslogar(bloqueio);

const btnExtrato = document.querySelector('#btnExtrato');
btnExtrato.setAttribute('aba','ativa');

const btnGraficos = document.querySelector('#btnGraficos');
const areaDias = document.querySelector('section');

const areaFiltros = document.querySelector('.filtros');
areaFiltros.append(areaSelecaoAno(), areaSelecaoMes());
let anoFiltro = -1;
let mesFiltro = -1;

if(btnExtrato.getAttribute('aba') == 'ativa'){
    anoFiltro = areaFiltros.querySelector('.anoSelecionado').textContent;
    anoFiltro = Number(anoFiltro);
    
    mesFiltro = areaFiltros.querySelector('.mesSelecionado').textContent;
    mesFiltro = qualNumero(mesFiltro);
}

btnExtrato.addEventListener('click', function(e){
    e.preventDefault();
    btnExtrato.setAttribute('aba','ativa');
    btnGraficos.setAttribute('aba','desativa');

    btnExtrato.classList.add('opcaoSelecionadaMenu');
    btnGraficos.classList.remove('opcaoSelecionadaMenu');

    document.querySelector('.guiaAtual').textContent = 'extrato';

    areaExtrato();
})

btnGraficos.addEventListener('click', function(e){
    e.preventDefault();
    btnGraficos.setAttribute('aba','ativa');
    btnExtrato.setAttribute('aba','desativa');

    btnGraficos.classList.add('opcaoSelecionadaMenu');
    btnExtrato.classList.remove('opcaoSelecionadaMenu');
    document.querySelector('.guiaAtual').textContent = 'graficos';
    areaDias.innerHTML = '';

    graficosEstatico();
})

areaExtrato();

function graficosEstatico(){

    const arrayGastos = [
        [
            {
                nome: 'Streaming',
                cor: '#095FB8'
            },
            {
                nome: 'Viagens',
                cor: '#4C2CA3'
            },
            {
                nome: 'Alimentação',
                cor: '#8312B8'
            },
            {
                nome: 'Shopping',
                cor: '#A62189'
            },
            {
                nome: 'Moradia',
                cor: '#C4336B'
            },
            {
                nome: 'Pets',
                cor: '#FF5555'
            },
            {
                nome: 'Hobbies',
                cor: '#C7371E'
            }
        ],
        [
            {
                nome: 'Aluguel',
                cor: '#095FB8'
            },
            {
                nome: 'Luz',
                cor: '#4C2CA3'
            },
            {
                nome: 'IPTU',
                cor: '#8312B8'
            },
            {
                nome: 'Água',
                cor: '#A62189'
            },
            {
                nome: 'Internet',
                cor: '#C4336B'
            },
            {
                nome: 'Spotify',
                cor: '#FF5555'
            }
        ],
        [
            {
                nome: 'TV',
                cor: '#095FB8'
            },
            {
                nome: 'Celular novo',
                cor: '#4C2CA3'
            },
            {
                nome: 'Roupas da shein',
                cor: '#8312B8'
            },
            {
                nome: 'Conserto do carro',
                cor: '#A62189'
            },
            {
                nome: 'Guitarra',
                cor: '#C4336B'
            },
            {
                nome: 'Bolo de aniversário',
                cor: '#FF5555'
            }
        ],
        [
            {
                nome: 'Streaming',
                cor: '#095FB8'
            },
            {
                nome: 'Coleção de photocard',
                cor: '#4C2CA3'
            },
            {
                nome: 'Alimentação',
                cor: '#8312B8'
            },
            {
                nome: 'Shopping',
                cor: '#A62189'
            },
            {
                nome: 'Moradia',
                cor: '#C4336B'
            },
        ],
        [
            {
                nome: 'Aluguel',
                cor: '#095FB8'
            },
            {
                nome: 'Luz',
                cor: '#4C2CA3'
            },
            {
                nome: 'IPTU',
                cor: '#8312B8'
            },
            {
                nome: 'Água',
                cor: '#A62189'
            },
            {
                nome: 'Internet',
                cor: '#C4336B'
            },
            {
                nome: 'Spotify',
                cor: '#FF5555'
            },
            {
                nome: 'Disney+',
                cor: '#C7371E'
            }
        ],
        [
            {
                nome: 'TV',
                cor: '#095FB8'
            },
            {
                nome: 'Celular novo',
                cor: '#4C2CA3'
            },
            {
                nome: 'Roupas da shein',
                cor: '#8312B8'
            },
            {
                nome: 'Conserto do carro',
                cor: '#A62189'
            },
            {
                nome: 'Gaiola do papagaio',
                cor: '#C4336B'
            },
            {
                nome: 'Bolo de aniversário',
                cor: '#FF5555'
            }
        ],
    ]

    const valorTotal = ['1208,00', '1012,00', '862,00', '1116,00', '931,00', '1008,00'];

    let imgGraficos = 6;

    const dataNovembro = document.createElement('p');
    dataNovembro.textContent = 'Novembro de 2026';
    dataNovembro.classList.add('tituloGeral');

    for (let index = 0; index < imgGraficos; index++) {

        if(index == 3)
        {
            const dataOutubro = document.createElement('p');
            dataOutubro.textContent = 'Outubro de 2026';
            dataOutubro.classList.add('tituloGeral');
            dataOutubro.style.marginTop = '16px'

            areaDias.appendChild(dataOutubro);
        }
        
        const areaGrafico = document.createElement('div');
        areaGrafico.classList.add('areaGrafico');

        const tipoGrafico = document.createElement('p');
        tipoGrafico.classList.add('tituloMenor');

        if(index == 0 || index == 3)
        {
            tipoGrafico.textContent = 'Gastos categorizados';
        }
        else
        {
            if(index == 1 || index == 4)
            {
                tipoGrafico.textContent = 'Gastos Fixos';
            }
            else
            {
                tipoGrafico.textContent = 'Gastos Parcelados';
            }
        }

        const graficoImg = document.createElement('img');
        graficoImg.src = 'img/graficos/g' + index + '.png';
        graficoImg.classList.add('graficoImg');

        const gastos = document.createElement('div');
        gastos.classList.add('gastos');

        for (let i = 0; i < arrayGastos[index].length; i++) {

            const criarGasto = arrayGastos[index][i];
    
            const gasto = document.createElement('div');
            gasto.classList.add('gasto');
    
            const corGasto = document.createElement('div');
            corGasto.classList.add('corGasto');
            corGasto.style.backgroundColor = criarGasto.cor;
    
            const tituloGasto = document.createElement('p');
            tituloGasto.textContent = criarGasto.nome;
    
            gasto.append(corGasto, tituloGasto);
            gastos.appendChild(gasto);
            
        }

        const areaSaldo = document.createElement('div');
        areaSaldo.classList.add('areaSaldo');
    
        const tituloSaldo = document.createElement('p');
        tituloSaldo.textContent = 'Gasto total';
        tituloSaldo.classList.add('tituloSaldo');

        const saldo = document.createElement('p');
        saldo.textContent = 'R$' + valorTotal[index];

        areaSaldo.append(tituloSaldo, saldo);

        areaGrafico.append(tipoGrafico, graficoImg, gastos, areaSaldo);

        areaDias.appendChild(areaGrafico);
    }

    const areaGrafico = document.querySelectorAll('.areaGrafico');
    areaDias.prepend(dataNovembro);
}

function areaExtrato(){
    areaDias.innerHTML = '';
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
}


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
    mesSelecionado.textContent = 'Mês';

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

                if(areaFiltros.querySelector('.anoSelecionado').textContent == 'Tudo' || areaFiltros.querySelector('.anoSelecionado').textContent == 'Ano'){
                    anoFiltro = -1;
                }
                
                let mesFiltro = mesSelecionado.textContent;
                
                if(mesSelecionado.textContent == 'Tudo' || mesSelecionado.textContent == 'Mês'){
                    mesFiltro = -1;
                }else{
                    mesFiltro = qualNumero(mesFiltro); 
                }

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
    anoSelecionado.textContent = 'Ano';

    const btnMaisOpcoes = document.createElement('button');
    btnMaisOpcoes.classList.add('btnMaisOpcoes');

    const iconMaisOpcoes = document.createElement('img');
    iconMaisOpcoes.src = "img/seta.svg";
    iconMaisOpcoes.classList.add('maisOpcoes');

    const naoSelecionado = document.createElement('div');
    naoSelecionado.classList.add('naoSelecionado');

    const todos = document.createElement('p');
    todos.classList.add('opcao');
    todos.classList.add('anoEscolher');
    todos.textContent = 'Tudo';

    const ano = document.createElement('p');
    ano.classList.add('opcao');
    ano.classList.add('anoEscolher');
    ano.textContent = '2026';

    const ano2 = document.createElement('p');
    ano2.classList.add('opcao');
    ano2.classList.add('anoEscolher');
    ano2.textContent = '2025';
    ano2.style.borderBottom = 'none';

    btnMaisOpcoes.appendChild(iconMaisOpcoes);
    areaAnoSelecionado.append(anoSelecionado, btnMaisOpcoes);
    naoSelecionado.append(ano, ano2);
    naoSelecionado.append(todos, ano, ano2);
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

                if(anoSelecionado.textContent == 'Tudo' || anoSelecionado.textContent == 'Ano'){
                    anoFiltro = -1;
                }

                let mesFiltro = areaFiltros.querySelector('.mesSelecionado').textContent;
                mesFiltro = qualNumero(mesFiltro);

                if(areaFiltros.querySelector('.mesSelecionado').textContent == 'Tudo' || areaFiltros.querySelector('.mesSelecionado').textContent == 'Mês'){
                    mesFiltro = -1;
                }

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

        areaDia.appendChild(conjuntoData);
        areaDia.appendChild(areaExtrato);
        document.querySelector('section').appendChild(areaDia);
    }
}

function criarMovimentacao(local, movimentacoes){
    for (let i = 0; i < movimentacoes.length; i++) {
        console.log(movimentacoes[i]);
        if(movimentacoes[i].Valor != 0 || movimentacoes[i].Valor != 0.00){
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