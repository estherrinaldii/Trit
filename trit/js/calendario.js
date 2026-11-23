import { FormatarData, botaoSair, deslogar, formataInputData, formataInputValor, erro, avisoSair, validaData } from "./funcoes.js";

if(sessionStorage['logado'] == null || sessionStorage['logado'] == ""){
    window.location.href = "http://localhost/Trit/trit/login.html";
}

const body = document.querySelector('body');
const bloqueio = document.createElement('div');
bloqueio.classList.add('bloqueio');

deslogar(bloqueio);

const msgErro = document.createElement('p');
msgErro.classList.add('erro');

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
                nome.classList.add('nomeGastoMensal');
                nome.textContent = txtNome;

                const areaValor = document.createElement('div');
                areaValor.classList.add('subtxt');

                  const moeda = document.createElement('p');
                  moeda.textContent = 'R$';

                  const valor = document.createElement('p');
                  valor.textContent = txtValor;

                areaValor.appendChild(moeda);
                areaValor.appendChild(valor);

                let valorParcela = null;
                    
                  if(txtTipo == 'parcelada'){

                    valorParcela = document.createElement('p');
                    valorParcela.classList.add('valorParcela')
                    valorParcela.textContent = `(${txtParcelaAtual}/${txtParcelaTotal})`;

                    areaValor.appendChild(valorParcela);
                  }             

            info.appendChild(nome);
            info.appendChild(areaValor);

        infosGastos.appendChild(info);

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

    icone.addEventListener('click', function(e){

      bloqueio.innerHTML = '';

      const areaEditarGasto = document.createElement('div');
      areaEditarGasto.classList.add('popup');

      const areaTitulo = document.createElement('div');
      areaTitulo.classList.add('areaTitulo');

      const tituloEditarGasto = document.createElement('p');
      tituloEditarGasto.classList.add('tituloMenor');
      tituloEditarGasto.classList.add('tituloPopup');
      tituloEditarGasto.textContent = 'Editar ' + txtNome.toLowerCase();

      const btnSair = botaoSair();

      areaTitulo.append(tituloEditarGasto, btnSair);

      const areaInfos = document.createElement('div');
      areaInfos.classList.add('infos');

      const areaNomeGasto = document.createElement('div');
      areaNomeGasto.classList.add('areaDigitar');

      const labelNomeGasto = document.createElement('label');
      labelNomeGasto.textContent = 'Nome:';

      const txtNomeGasto = document.createElement('input');
      txtNomeGasto.type = 'text';
      txtNomeGasto.value = txtNome;

      areaNomeGasto.append(labelNomeGasto, txtNomeGasto);
      const areaValorGasto = document.createElement('div');
      areaValorGasto.classList.add('areaDigitar');

      const labelValorGasto = document.createElement('label');

      const areaLeft = document.createElement('div');
      areaLeft.classList.add('areaLeft');

      const txtValorGasto = document.createElement('input');
      txtValorGasto.type = 'text';
      txtValorGasto.value = txtValor;
      txtValorGasto.inputMode = 'numeric';
      txtValorGasto.value = txtValor;
      txtValorGasto.classList.add('recuoPopup');
      txtValorGasto.classList.add('inputMoeda');

      const moeda = document.createElement('p');
      moeda.textContent = 'R$';
      moeda.classList.add('moeda');

      areaLeft.append(txtValorGasto, moeda);

      formataInputValor(txtValorGasto, txtValor);

      areaValorGasto.append(labelValorGasto, areaLeft);

      const areaVencimentoGasto = document.createElement('div');
      areaVencimentoGasto.classList.add('areaDigitar');

      const labelVencimentoGasto = document.createElement('label');
      labelVencimentoGasto.textContent = 'Vencimento:';

      const txtVencimentoGasto = document.createElement('input');
      txtVencimentoGasto.type = 'text';
      txtVencimentoGasto.value = txtDataVencimento;
      txtVencimentoGasto.inputMode = 'numeric';

      formataInputData(txtVencimentoGasto, txtDataVencimento.replaceAll('/',''));

      areaVencimentoGasto.append(labelVencimentoGasto, txtVencimentoGasto);

      let txtParcelasGasto = null;

      if(txtTipo == 'parcelada')
      {
        const divAlinhamento = document.createElement('div');
        divAlinhamento.classList.add('divAlinhamento');

        const areaParcelasGasto = document.createElement('div');
        areaParcelasGasto.classList.add('areaDigitar');

        const labelParcelasGasto = document.createElement('label');
        labelParcelasGasto.textContent = 'Nº de parcelas:';

        txtParcelasGasto = document.createElement('input');
        txtParcelasGasto.type = 'text';
        txtParcelasGasto.value = txtParcelaTotal;
        txtParcelasGasto.id = 'txtParcelas';

        areaParcelasGasto.append(labelParcelasGasto, txtParcelasGasto);

        labelValorGasto.textContent = 'Valor da parcela:';

        divAlinhamento.append(areaVencimentoGasto, areaParcelasGasto)
        areaInfos.append(areaNomeGasto, divAlinhamento, areaValorGasto);
      }
      else
      {
        labelValorGasto.textContent = 'Valor:';
        areaInfos.append(areaNomeGasto, areaVencimentoGasto, areaValorGasto);
      }

      const divAlinhamento = document.createElement('div');
      divAlinhamento.classList.add('divAlinhamento');

      const btnSalvar = document.createElement('button');
      btnSalvar.textContent = 'Salvar';
      btnSalvar.classList.add('btnSalvar');

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.classList.add('btnExcluirElemento');

      divAlinhamento.append(btnSalvar, btnExcluir);

      areaEditarGasto.append(areaTitulo, areaInfos, divAlinhamento);

      bloqueio.appendChild(areaEditarGasto);
      body.appendChild(bloqueio);

      btnSair.addEventListener('click', function(e){
        e.preventDefault();

        areaEditarGasto.remove();
        avisoSair(bloqueio);
      })

      btnSalvar.addEventListener('click', function(e){
        e.preventDefault();

        if(txtNomeGasto.value == '')
        {
          erro(msgErro, txtNomeGasto, 'Nome não foi informado!', areaInfos);
          return;
        }

        let erroEncontrado = '';
        erroEncontrado = validaData(msgErro, txtVencimentoGasto, areaInfos);

        if(erroEncontrado)
        {
          return;
        }

        if(document.querySelector('#txtParcelas'))
        {
          if(txtParcelasGasto.value == '')
          {
            erro(msgErro, txtParcelasGasto, 'Número de parcelas não foi informado!', areaInfos);
            return;
          }
        }

        if(txtValorGasto.value == '' || txtValorGasto.value == '0,00')
        {
          erro(msgErro, txtValorGasto, 'Valor não foi informado!', areaInfos);
          return;
        }

        areaEditarGasto.remove();
        bloqueio.remove();

        nome.textContent = txtNomeGasto.value;

        dataVencimento.textContent = txtVencimentoGasto.value;

        if(txtTipo == 'parcelada'){
          valorParcela.textContent = '(' + txtParcelaAtual + '/' + txtParcelasGasto.value + ')';
        }

        valor.textContent = txtValorGasto.value;
        
      })

      btnExcluir.addEventListener('click', function(e){
        e.preventDefault();

        gasto.remove()
        areaEditarGasto.remove();
        bloqueio.remove();
      })
    })
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
