export function erro(input, mensagem, local){
    
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