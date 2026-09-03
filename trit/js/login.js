//exibição

const body = document.querySelector('body');
const form = document.createElement('form');

const tritLogo2 = document.createElement('img');
tritLogo2.src = 'img/logo2.png';
tritLogo2.alt = 'logo trit';
tritLogo2.classList.add('tritLogo2')

const areaInfos = document.createElement('div');
areaInfos.classList.add('infos');

const areaEmail = document.createElement('div');
areaEmail.classList.add('areaDigitar');

const labelEmail = document.createElement('label');
labelEmail.textContent = 'Email:';

const txtEmail = document.createElement('input');
txtEmail.type = 'text';

const areaSenha = document.createElement('div');
areaSenha.classList.add('areaDigitar');

const labelSenha = document.createElement('label');
labelSenha.textContent = 'Senha:';

const txtSenha = document.createElement('input');
txtSenha.type = 'password';

const areaNome = document.createElement('div');
areaNome.classList.add('areaDigitar');

const labelNome = document.createElement('label');
labelNome.textContent = 'Nome:';

const txtNome = document.createElement('input');
txtNome.type = 'text';

const areaConfirmaSenha = document.createElement('div');
areaConfirmaSenha.classList.add('areaDigitar');

const labelConfirmaSenha = document.createElement('label');
labelConfirmaSenha.textContent = 'Confirme sua senha:';

const txtConfirmaSenha = document.createElement('input');
txtConfirmaSenha.type = 'password';

const btnEntrar = document.createElement('button');
btnEntrar.classList.add('btnEntrar');
btnEntrar.textContent = 'Entrar';

const btnGoogle = document.createElement('button');
btnGoogle.classList.add('btnGoogle');
btnGoogle.textContent = 'Entrar com Google';

const logoGoogle = document.createElement('img');
logoGoogle.src = 'img/google.png';
logoGoogle.alt = 'logo google';
logoGoogle.classList.add('googleImg');

const btnContinuar = document.createElement('button');
btnContinuar.classList.add('btnContinuar');
btnContinuar.textContent = 'Continuar'

const opcaoRegistro = document.createElement('div');
opcaoRegistro.classList.add('opcaoRegistro');

const txtRegistro = document.createElement('p');
txtRegistro.textContent = 'Não tem um cadastro?'

const btnRegistro = document.createElement('a');
btnRegistro.textContent = 'Registre-se!';

const msgErro = document.createElement('p');
msgErro.classList.add('erro')

areaEmail.append(labelEmail, txtEmail);
areaSenha.append(labelSenha, txtSenha);

areaInfos.append(areaEmail, areaSenha);

btnGoogle.prepend(logoGoogle);

opcaoRegistro.append(txtRegistro, btnRegistro);

form.append(areaInfos, btnEntrar, btnGoogle);

body.append(tritLogo2, form, opcaoRegistro);

//botões

let local = 'login';

btnRegistro.addEventListener('click', function(e){

    if(local == 'login')
    {
        local = 'registro';

        btnEntrar.remove();
        btnGoogle.remove();

        txtRegistro.textContent = 'Já tem um cadastro?';
        btnRegistro.textContent = 'Login';

        txtEmail.value = '';
        txtSenha.value = '';

        areaNome.append(labelNome, txtNome);

        areaConfirmaSenha.append(labelConfirmaSenha, txtConfirmaSenha);

        areaInfos.prepend(areaNome);
        areaInfos.appendChild(areaConfirmaSenha);

        form.appendChild(btnContinuar);
    }
    else{
        if(local == 'registro')
        {
            local = 'login';

            areaNome.remove();
            areaConfirmaSenha.remove();
            btnContinuar.remove();

            txtRegistro.textContent = 'Não tem um cadastro?';
            btnRegistro.textContent = 'Registre-se!';

            txtNome.value = '';
            txtEmail.value = '';
            txtSenha.value = '';
            txtConfirmaSenha.value = '';

            form.append(btnEntrar, btnGoogle);
        }
    }
    
})

btnEntrar.addEventListener('click', function(e){
    e.preventDefault();

    if(txtEmail.value == '')
    {
        erro(txtEmail, 'Email não foi informado!');
        return;
    }
    
    if(txtSenha.value == '')
    {
        erro(txtSenha, 'Email não foi informada!');
        return;  
    }

    //entrar

})

btnGoogle.addEventListener('click', function(e){
    e.preventDefault();

    //entrar com google
})

let pagina = 1
let categoriaCriada = false;

btnContinuar.addEventListener('click', function(e){
    e.preventDefault();

    if(pagina == 1)
    {
        if(txtNome.value == '')
        {
            erro(txtNome, 'Nome não foi informado!');
            return;
        }
        
        if(txtEmail.value == '')
        {
            erro(txtEmail, 'Email não foi informado!');
            return;
        }
            
        if(txtSenha.value == '')
        {
            erro(txtSenha, 'Senha não foi informada!'); 
            return;
        }
                
        if(txtConfirmaSenha.value == '')
        {
            erro(txtConfirmaSenha, 'Confirme a senha!'); 
            return;
        }
                    
        if(txtSenha.value != txtConfirmaSenha.value)
        {
            erro(txtConfirmaSenha, 'Confirmação incompatível!'); 
            return;
        }
                        
        //continuar (registrar informações!)

        areaInfos.remove();
        btnContinuar.remove();
        opcaoRegistro.remove();

        verificacaoCodigo();

        let caixa4 = document.querySelector('#caixa4');
        let areaVerificacao = document.querySelector('.areaVerificacao');

        if(caixa4)
        {
            caixa4.addEventListener('input', function(e){
            //verificação da senha

                areaVerificacao.remove();

                const areaRenda = document.createElement('div');
                areaRenda.classList.add('infos');

                const labelRenda = document.createElement('label');
                labelRenda.textContent = 'Informe sua renda mensal:';
                labelRenda.classList.add('titulo');

                const txtRenda = document.createElement('input');
                txtRenda.type = 'number'
                txtRenda.classList.add('txtRenda');

                const moeda = document.createElement('p');
                moeda.textContent = 'R$';
                moeda.classList.add('moeda');

                areaRenda.append(labelRenda, txtRenda, moeda);

                form.append(areaRenda, btnContinuar);

                txtRenda.focus();
            });
        }

        pagina = 2;
    }

    if(pagina == 2){
        let txtRenda = document.querySelector('.txtRenda');
        let areaRenda = document.querySelector('.infos');

        if(txtRenda.value == '')
        {
            erro(txtRenda, 'Renda não foi informada!');
            return;
        }

        areaRenda.remove();
        tritLogo2.remove();

        const header = document.createElement('header');

        const tritLogo3 = document.createElement('img');
        tritLogo3.src = 'img/logo3.png';
        tritLogo3.alt = 'logo trit';

        header.appendChild(tritLogo3);

        const areaCategorias = document.createElement('div');
        areaCategorias.classList.add('areaCategorias');

        const tituloCaregorias = document.createElement('p');
        tituloCaregorias.textContent = 'Selecione seus gastos frequentes:'
        tituloCaregorias.classList.add('titulo');

        const btnNovaCategoria = document.createElement('button');
        btnNovaCategoria.classList.add('btnNovaCategoria');
        btnNovaCategoria.textContent = 'Nova categoria';

        const imgAdicionar = document.createElement('img');
        imgAdicionar.src = 'img/adicionar.png';
        imgAdicionar.alt = 'icone adicionar';

        btnNovaCategoria.prepend(imgAdicionar);

        const categoriasSugeridas = ['Alimentação', 'Viagem', 'Lazer', 'Vestuário', 'Moradia', 'Transporte', 'Saúde', 'Fitness', 'Entretenimento', 'Pets', 'Tecnologia', 'Trabalho', 'Manutenção', 'Utilidades', 'Beleza', 'Educação', 'Farmácia', 'Eventos'];

        

        for (let i = 0; i < categoriasSugeridas.length; i++) {
            const categoriaSugerida = categoriasSugeridas[i];
            
            const categoria = document.createElement('div');
            categoria.classList.add('categoria');

            const categoriaNome = document.createElement('p');
            categoriaNome.textContent = categoriaSugerida;

            categoria.appendChild(categoriaNome);
            areaCategorias.prepend(categoria);

            let click = false;

            categoria.addEventListener('click', function(e){

                categoriaCriada = false;
                if(click == false)
                {
                    categoria.style.backgroundColor = 'rgba(9, 94, 184, 0.21)';
                    click = true
        
                    novaCategoria(categoria, categoriasSugeridas);
                    

                    let txtNomeCategoria = document.querySelector('#txtNomeCategoria');
                    txtNomeCategoria.value = categoriaSugerida;
                    txtNomeCategoria.disabled = true;
                }
                else
                {
                    categoria.style.backgroundColor = 'transparent';
                    click = false

                    //excluir registro categoria
                }
            })


        } 

        body.prepend(header)
        areaCategorias.appendChild(btnNovaCategoria);
        form.prepend(tituloCaregorias, areaCategorias);

        btnNovaCategoria.addEventListener('click', function(e){
            e.preventDefault();

            categoriaCriada = true;
            novaCategoria(null, categoriasSugeridas);


            
        })

        pagina = 3;
    }

    if(pagina == 3)
    {

    }
    
})

//funções

function erro (local, mensagem){
    let infos = document.querySelector('.infos');

    local.classList.add('inputErro')
    msgErro.textContent = mensagem
    infos.appendChild(msgErro);

    setTimeout(() => {
        msgErro.remove();
        local.classList.remove('inputErro');
    }, 2000);  
}

function verificacaoCodigo (){
    const areaVerificação = document.createElement('div');
    areaVerificação.classList.add('areaVerificacao');

    const tituloVerificacao = document.createElement('p');
    tituloVerificacao.textContent = 'Verificação do email';
    tituloVerificacao.classList.add('titulo');

    const txtVerificacao = document.createElement('p');
    txtVerificacao.textContent = 'Enviamos um código para o seu email';
    txtVerificacao.classList.add('txtVerificacao');

    const areaCodigo = document.createElement('div');
    areaCodigo.classList.add('areaCodigo');

    const caixa1 = document.createElement('input');
    caixa1.type = 'text';
    caixa1.classList.add('caixaVerificacao');
    caixa1.maxLength = '1';
    caixa1.inputMode = 'numeric'

    const caixa2 = document.createElement('input');
    caixa2.type = 'text';
    caixa2.classList.add('caixaVerificacao');
    caixa2.maxLength = '1';
    caixa2.inputMode = 'numeric'

    const caixa3 = document.createElement('input');
    caixa3.type = 'text';
    caixa3.classList.add('caixaVerificacao');
    caixa3.maxLength = '1';
    caixa3.inputMode = 'numeric'

    const caixa4 = document.createElement('input');
    caixa4.type = 'text';
    caixa4.classList.add('caixaVerificacao');
    caixa4.maxLength = '1';
    caixa4.inputMode = 'numeric'
    caixa4.id = 'caixa4'

    areaCodigo.append(caixa1, caixa2, caixa3, caixa4);
    areaVerificação.append(tituloVerificacao, txtVerificacao, areaCodigo);

    form.appendChild(areaVerificação);

    caixa1.focus();

    if(caixa1)
    {
        const caixas = document.querySelectorAll('.caixaVerificacao');

        for (let i = 0; i < caixas.length; i++) {
            let caixa = caixas[i];

            if(i < 3)
            {
                caixa.addEventListener('input', function(e){
                    if(caixa.value != '')
                    {
                        caixas[i+1].focus();
                    }
                });
            }
            
            if(i > 0)
            {
                caixa.addEventListener('keydown', function(e){
                    if(e.key == 'Backspace' && caixa.value == '')
                    {
                        caixas[i-1].focus();
                    }
                })

            }
            
        }
    }
}

function novaCategoria(categoriaAtual, categoriasSugeridas){
    
    const divBloqueio = document.createElement('div');
    divBloqueio.classList.add('bloqueio');

    const areaCriarCategoria = document.createElement('div');
    areaCriarCategoria.classList.add('areaCriarCategoria');

    const areaTitulo = document.createElement('div');
    areaTitulo.classList.add('tituloCategoria');

    const tituloCriarCategoria = document.createElement('p');
    tituloCriarCategoria.textContent = 'Nova categoria';
    tituloCriarCategoria.classList.add('titulo');

    const btnSair = document.createElement('img');
    btnSair.src = 'img/sair.png';
    btnSair.alt = 'icone sair';

    const areaNomeCategoria = document.createElement('div');
    areaNomeCategoria.classList.add('areaDigitar');

    const labelNomeCategoria = document.createElement('label');
    labelNomeCategoria.textContent = 'Nome da categoria:'

    const txtNomeCategoria = document.createElement('input');
    txtNomeCategoria.type = 'text';
    txtNomeCategoria.id = 'txtNomeCategoria';

    const areaValorCategoria = document.createElement('div');
    areaValorCategoria.classList.add('areaDigitar');
    areaValorCategoria.classList.add('infos');

    const labelValorCategoria = document.createElement('label');
    labelValorCategoria.textContent = 'Valor limite:';

    const txtValorCategoria = document.createElement('input');
    txtValorCategoria.type = 'number';
    
    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.classList.add('btnSalvar');

    areaTitulo.append(tituloCriarCategoria, btnSair);

    areaNomeCategoria.append(labelNomeCategoria, txtNomeCategoria);

    areaValorCategoria.append(labelValorCategoria, txtValorCategoria);

    areaCriarCategoria.append(areaTitulo, areaNomeCategoria, areaValorCategoria, btnSalvar)

    body.append(divBloqueio, areaCriarCategoria);

    btnSair.addEventListener('click', function(e){
        divBloqueio.remove();
        areaCriarCategoria.remove();

        if(categoriaCriada == false)
        {
            categoriaAtual.style.backgroundColor = 'transparent';
        }
    })

    btnSalvar.addEventListener('click', function(e){
        e.preventDefault();

        if(txtNomeCategoria.value == '')
        {
            erro(txtNomeCategoria, 'Nome da categoria não foi informado!');
            return;
        }
        if(txtValorCategoria.value == '')
        {
            erro(txtValorCategoria, 'Valor limite não foi informado!');
            return;
        }

        for (let i = 0; i < categoriasSugeridas.length; i++) {
            
            if(txtNomeCategoria.value.trim().toUpperCase() == categoriasSugeridas[i].toUpperCase())
            {
                erro(txtNomeCategoria, 'Categoria já existente!');
                return;
            }
        }

        categoriasSugeridas.push(txtNomeCategoria.value);
        console.log(categoriasSugeridas);

        if(categoriaCriada == true)
        {
            let areaCategorias = document.querySelector('.areaCategorias');

            const categoria = document.createElement('div');
            categoria.classList.add('categoria');
            categoria.style.backgroundColor = 'rgba(9, 94, 184, 0.21)';

            let click = true;

            categoria.addEventListener('click', function(e){

                if(click == true)
                {
                    categoria.style.backgroundColor = 'rgba(9, 94, 184, 0.21)';
                    click = false
                }
                else
                {
                    categoria.style.backgroundColor = 'transparent';
                    click = true;
                }
            })

            const categoriaNome = document.createElement('p');
            categoriaNome.textContent = txtNomeCategoria.value;

            categoria.appendChild(categoriaNome);
            areaCategorias.prepend(categoria);
        }

        divBloqueio.remove();
        areaCriarCategoria.remove();

        //salvar categoria
    })

}