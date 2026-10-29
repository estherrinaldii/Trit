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
areaFiltros.append(areaSelecaoAno(), areaSelecaoMes())

const dias = document.querySelectorAll('.dia');

if(dias.length == 0)
{
    const semRegistros = document.createElement('p');
    semRegistros.textContent = 'Nenhum registro para essa data';
    semRegistros.classList.add('semRegistros');

    areaDias.appendChild(semRegistros);
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
    mesSelecionado.textContent = 'Janeiro';

    const btnMaisOpcoes = document.createElement('button');
    btnMaisOpcoes.classList.add('btnMaisOpcoes');

    const iconMaisOpcoes = document.createElement('img');
    iconMaisOpcoes.src = "img/seta.svg";
    iconMaisOpcoes.classList.add('maisOpcoes');

    const naoSelecionado = document.createElement('div');
    naoSelecionado.classList.add('naoSelecionado');

    btnMaisOpcoes.appendChild(iconMaisOpcoes);
    areaMesSelecionado.append(mesSelecionado, btnMaisOpcoes);

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    for (let i = 0; i < meses.length; i++) {
        
        const mes = document.createElement('p');
        mes.classList.add('opcao');
        mes.classList.add('mesEscolher');
        mes.textContent = meses[i];

        if(i == 0)
        {
            mes.style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
        }

        if(i == 11)
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
            
            if(opcoesEscolher[i].textContent == AnoSelecionado.textContent)
            {
                opcoesEscolher[i].style.backgroundColor = 'rgba(9, 95, 184, 0.21)';
            }
        }
    }

    return selecionarAno;
}