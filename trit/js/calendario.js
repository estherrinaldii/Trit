import { FormatarData } from "./funcoes.js";

if(sessionStorage['logado'] == null || sessionStorage['logado'] == ""){
    window.location.href = "http://localhost/Trit/trit/login.html";
}

fetch("http://localhost/Trit/trit/api/listarSaidasPendentes.php", {
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
        for (let i = 0; i < dadosJSON.pendentes.length; i++) {
            const pendencia = dadosJSON.pendentes[i];
            criarPendencia(pendencia.Nome, pendencia.Codigo);
        }
    }
  })
  .catch(function (error) {
    console.warn(error);
  });

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



function criarPendencia(txtNome){
    const areaPendencia = document.querySelector('.areaPendencias');

    const card = document.createElement('div');
    card.classList.add('pendencia');

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