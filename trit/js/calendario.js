const pendencias = document.querySelectorAll('.pendencia');

for (let i = 0; i < pendencias.length; i++) {
    const checkbox = pendencias[i];

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

fetch("http://localhost/Trit/trit/api/listarCategorias.php", {
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
    console.log(dadosJSON)
}
})
.catch(function (error) {
    console.warn(error);
});

function criarGasto(txtTipo, txtNome, txtValor, txtDataVencimento, txtParcelaAtual, txtParcelaTotal){
    const areaMensal = document.querySelector('.gastosMensais');

    const gasto = document.createElement('div');
    gasto.classList.add('gasto');

        const infosGastos = document.createElement('div');
        infosGastos.classList.add('infosGastos');

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

            if(txtTipo == 'parcelado'){
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
                
                info.appendChild(tituloParcela, areaParcela);
        
                infosGastos.appendChild(info);
            }

            info = document.createElement('div');
            info.classList.add('info3');

                const titulo = document.createElement('p');
                titulo.textContent = 'Vencimento';

                const dataVencimento = document.createElement('p');
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