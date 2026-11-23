import { FormatarData } from "./funcoes.js";

if(sessionStorage['logado'] == null || sessionStorage['logado'] == ""){
    window.location.href = "http://localhost/Trit/trit/login.html";
}
  // fixo
  fetch("http://localhost/Trit/trit/api/listarSaidasTipos.php?"+'tipo=fixa', {
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
          for (let i = 0; i < dadosJSON.saidas.length; i++) {
            const saida = dadosJSON.saidas[i];
            let valor = saida.Valor;
            valor = Number(valor).toFixed(2);
            valor = String(valor).replace('.',',');
            
            let data = saida.Prazo;
            let conjuntoData = data.split("-");
            
            let dataFormatada = `${conjuntoData[2]}/${conjuntoData[1]}/${conjuntoData[0]}`;

            criarGasto(saida.Tipo, saida.Nome, valor, dataFormatada, null, null, saida.Codigo);
            criarPendencia(saida.Nome, dataFormatada, saida.Codigo);
          }
      }
    })
    .catch(function (error) {
      console.warn(error);
    });
  
  
  // parcelado
  fetch("http://localhost/Trit/trit/api/listarSaidasTipos.php?"+'tipo=parcelada', {
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
          for (let i = 0; i < dadosJSON.saidas.length; i++) {
            const saida = dadosJSON.saidas[i];
            let valor = saida.Valor;
            valor = Number(valor).toFixed(2);
            valor = String(valor).replace('.',',');
            
            let data = saida.Prazo;
            let conjuntoData = data.split("-");
            
            let dataFormatada = `${conjuntoData[2]}/${conjuntoData[1]}/${conjuntoData[0]}`;
            
            criarGasto(saida.Tipo, saida.Nome, valor, dataFormatada, 0, saida.Parcelas, saida.Codigo);
            criarPendencia(saida.Nome, dataFormatada, saida.Codigo);
          }
      }
    })
    .catch(function (error) {
      console.warn(error);
    });
    
function criarGasto(txtTipo, txtNome, txtValor, txtDataVencimento, txtParcelaAtual, txtParcelaTotal, codigo){
    const areaMensal = document.querySelector('.gastosMensais');

    const gasto = document.createElement('div');
    gasto.classList.add('gasto');
    gasto.id = codigo;

        const infosGastos = document.createElement('div');
        infosGastos.classList.add('infosGasto');

            let info = document.createElement('div');
            info.classList.add('info1');

                const nome = document.createElement('p');
                nome.textContent = txtNome;

                const areaValor = document.createElement('div');
                areaValor.classList.add('subtxt');

                    const moeda = document.createElement('p');
                    moeda.textContent = 'R$';

                    const valor = document.createElement('p');
                    valor.textContent = txtValor;
                
                areaValor.appendChild(moeda);
                areaValor.appendChild(valor);

            info.appendChild(nome);
            info.appendChild(areaValor);

        infosGastos.appendChild(info);

            if(txtTipo == 'parcelada'){
                info = document.createElement('div');
                info.classList.add('info2');
    
                    const tituloParcela = document.createElement('p');
                    tituloParcela.textContent = 'Frequência';
                    
                    const areaParcela = document.createElement('div');
    
                        const valorParcela = document.createElement('p');
                        valorParcela.textContent = `${txtParcelaAtual}/${txtParcelaTotal}`;
    
                        const txtParcela = document.createElement('p');
                        txtParcela.textContent = 'parcelas';
                    
                    areaParcela.appendChild(valorParcela);
                    areaParcela.appendChild(txtParcela);
                
                info.appendChild(tituloParcela);
                info.appendChild(areaParcela);
        
                infosGastos.appendChild(info);
            }

            info = document.createElement('div');
            info.classList.add('info3');

                const titulo = document.createElement('p');
                titulo.textContent = 'Vencimento';

                const dataVencimento = document.createElement('p');
                dataVencimento.classList.add('subtxt');
                dataVencimento.textContent = txtDataVencimento;
            
            info.appendChild(titulo);
            info.appendChild(dataVencimento);
    
        infosGastos.appendChild(info);

            const icone = document.createElement('img');
            icone.classList.add('icone');
            icone.src = 'img/seta-azul.svg';

    gasto.appendChild(infosGastos);
    gasto.appendChild(icone);

    areaMensal.appendChild(gasto);
}



function criarPendencia(txtNome, txtData, codigo){
    const areaPendencia = document.querySelector('.areaPendencias');

    const card = document.createElement('div');
    card.classList.add('pendencia');
    card.id = codigo;

        const areaConfirmacao = document.createElement('div');
        areaConfirmacao.classList.add('checkbox');
            
            const iconeConfirmar = document.createElement('img');
            iconeConfirmar.src = 'img/check-icon.svg';

            areaConfirmacao.addEventListener('click', function(e){
                e.preventDefault();
        
                if(!card.classList.contains('concluido'))
                {
                    card.classList.add('concluido');
                }
                else
                {
                    card.classList.remove('concluido');
                }
            });

        areaConfirmacao.appendChild(iconeConfirmar);

            const titulo = document.createElement('p');
            titulo.textContent = txtNome;

    card.appendChild(areaConfirmacao);
    card.appendChild(titulo);

    areaPendencia.appendChild(card);
}

exibirCalendario(0, 2026);

function exibirCalendario(mes, ano){
  const localDia = document.querySelector('.dias');
  localDia.innerHTML = '';

  let semanas = gerarSemanas(mes, ano);
  for (let i = 0; i < semanas.length; i++) {
    const separaDia = document.createElement('div');
    separaDia.classList.add('separaDia');
      for (let j = 0; j < semanas[i].length; j++) {
        const txtDia = document.createElement('p');
        if(semanas[i][j] == null){
          txtDia.textContent = 'xx';
        }else{
          if(Number(semanas[i][j]) < 10){
            let arrumaDia = `0${semanas[i][j]}`;
            txtDia.textContent = arrumaDia;
          }else{
            txtDia.textContent = semanas[i][j];
          }
        }
        separaDia.appendChild(txtDia);
      }
    
    localDia.appendChild(separaDia);
  }

}


function gerarSemanas(mes, ano) {
  const primeiroDiaSemana = new Date(ano, mes - 1, 1).getDay();
  const totalDiasMesAtual = new Date(ano, mes, 0).getDate();
  const totalDiasMesAnterior = new Date(ano, mes - 1, 0).getDate();

  const slots = [];

  for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
    slots.push(totalDiasMesAnterior - i);
  }

  for (let dia = 1; dia <= totalDiasMesAtual; dia++) {
    slots.push(dia);
  }

  let diaProximoMes = 1;
  while (slots.length % 7 !== 0) {
    slots.push(diaProximoMes++);
  }

  const semanas = [];
  for (let i = 0; i < slots.length; i += 7) {
    semanas.push(slots.slice(i, i + 7));
  }

  return semanas;
}

let mesAtual  = new Date().getMonth();
const mes = document.getElementById('mes');
mes.setAttribute('qualMes', mesAtual);
mes.textContent = qualMes(Number(mes.getAttribute('qualMes')) + 1);

const btnAumentaMes = document.getElementById('aumentaMes');
btnAumentaMes.addEventListener('click', function(e){
  e.preventDefault();
  let numeroMes = Number(mes.getAttribute('qualMes'));
  numeroMes++;

  mes.setAttribute('qualMes', numeroMes);
  mes.textContent = qualMes(numeroMes + 1);
  exibirCalendario(numeroMes, 2026);
})

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
