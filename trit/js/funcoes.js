export function erro(msgErro, input, mensagem, local){
    
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

export function avisoSair(bloqueio)
{
    const areaAviso = document.createElement('div');
    areaAviso.classList.add('popup');
    areaAviso.classList.add('areaAviso');

    const aviso = document.createElement('p');
    aviso.textContent = 'As alterações não foram salvas.'

    const btnOk = document.createElement('button');
    btnOk.classList.add('btnOk');
    btnOk.textContent = 'Ok';

    areaAviso.append(aviso, btnOk);
    bloqueio.appendChild(areaAviso);

    btnOk.addEventListener('click', function(e){
        e.preventDefault();

        areaAviso.remove();
        bloqueio.remove();
    })
}

export function obrigatorioIcon(input){

    const areaRight = document.createElement('div');
    areaRight.classList.add('areaRight');

    const obrigatorio = document.createElement('p');
    obrigatorio.textContent = '•'
    obrigatorio.classList.add('obrigatorio');

    areaRight.append(input, obrigatorio);

    input.addEventListener('input', function(e){

        areaRight.appendChild(obrigatorio);

        if(input.value.trim() != "")
        {
            obrigatorio.remove();
        }
        
    })

    return areaRight;
}


export function botaoSair()
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

export function validaData(msgErro, input, local){
    
    let valorVerificar = input.value.replaceAll('/', '');
    let erroEncontrado = false;

    if(valorVerificar == '' || valorVerificar == 'ddmmaaaa')
    {
        erro(msgErro, input, 'Data não foi informada!', local);
        erroEncontrado = true;
    }
    else
    {
        if(isNaN(valorVerificar))
        {
            erro(msgErro, input, 'Data inválida!', local);
            erroEncontrado = true;
        }
        else
        {
            let dia = valorVerificar.slice(0, 2);
            let mes = valorVerificar.slice(2, 4);
            let ano = valorVerificar.slice(4);

            if(Number(ano) < 2026)
            {
                erro(msgErro, input, 'Data inválida!', local);
                erroEncontrado = true;
            }
            else
            {
                if(Number(mes) > 12)
                {
                    erro(msgErro, input, 'Data inválida!', local);
                    erroEncontrado = true;
                }
                else
                {
                    if(mes == '01' || mes == '03' || mes == '05' || mes == '07' || mes == '08' || mes == '10' || mes == '12')
                    {
                        if(Number(dia) > 31)
                        {
                            erro(msgErro, input, 'Data inválida!', local);
                            erroEncontrado = true;
                        }
                    }
                    else
                    {
                        if(mes == '04' || mes == '06' || mes == '09' || mes == '11')
                        {
                            if(Number(dia) > 30)
                            {
                                erro(msgErro, input, 'Data inválida!', local);
                                erroEncontrado = true;
                            }
                        }
                        else
                        {
                            if(mes == '02')
                            {
                                if(Number(dia) > 29)
                                {
                                    erro(msgErro, input, 'Data inválida!', local);
                                    erroEncontrado = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    return erroEncontrado;
}

export function formataInputData(input, valorInicial)
{
    let valorDigitado = '';

    if(valorInicial)
    {
        valorDigitado = valorInicial;
    }

    input.addEventListener('keydown', function(e){
        e.preventDefault();

        if (/^\d$/.test(e.key) && valorDigitado.length < 8) 
        {
            valorDigitado += e.key
        }

        if (e.key === 'Backspace') 
        {
            valorDigitado = valorDigitado.slice(0, -1);
            input.disabled = false;
        }

        let valorExibir = valorDigitado.padEnd(8, ' ');
        valorExibir = valorExibir.slice(0, 2).replace(/ /g, 'd')  + valorExibir.slice(2, 4).replace(/ /g, 'm') +  valorExibir.slice(4, 8).replace(/ /g, 'a');
        valorExibir = valorExibir.slice(0, 2) + '/' + valorExibir.slice(2, 4) + '/' + valorExibir.slice(4);
        
        input.value = valorExibir;
    })
}

export function formataInputValor(input, valorInicial)
{
    let valorDigitado = '';

    if(valorInicial)
    {
        valorDigitado = valorInicial.replace(',','');
    }

    input.addEventListener('keydown', function(e){
        e.preventDefault();

        if (/^\d$/.test(e.key)) 
        {
            valorDigitado += e.key
        }

        if (e.key === 'Backspace') 
        {
            valorDigitado = valorDigitado.slice(0, -1);
        }

        let valorExibir = Number(valorDigitado) / 100;
        valorExibir = valorExibir.toFixed(2);
        valorExibir = String(valorExibir).replace('.',',');

        input.value = valorExibir;
    })
}