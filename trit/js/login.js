const body = document.querySelector('body');
const main = document.createElement('main');
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
txtSenha.classList.add('inputSenha');

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
txtConfirmaSenha.classList.add('inputSenha');

const btnEntrar = document.createElement('button');
btnEntrar.classList.add('aButton');
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

const requisitos = document.createElement('div');
requisitos.classList.add('requisitos');

const requisito1 = document.createElement('p');
requisito1.id = 'requisito1'
requisito1.textContent = 'Mínimo de 8 caracteres';

const requisito2 = document.createElement('p');
requisito2.id = 'requisito2'
requisito2.textContent = 'Requer letra maiúscula';

const requisito3 = document.createElement('p');
requisito3.id = 'requisito3'
requisito3.textContent = 'Requer letra minúscula';

const requisito4 = document.createElement('p');
requisito4.id = 'requisito4'
requisito4.textContent = 'Requer número';

const requisito5 = document.createElement('p');
requisito5.id = 'requisito5'
requisito5.textContent = 'Requer caractér especial';

const msgErro = document.createElement('p');
msgErro.classList.add('erro');

areaEmail.append(labelEmail, obrigatorioIcon(txtEmail));

areaRight = obrigatorioIcon(txtSenha);
areaRight.prepend(exibirSenha(txtSenha));
areaSenha.append(labelSenha, areaRight);

areaInfos.append(areaEmail, areaSenha);

btnGoogle.prepend(logoGoogle);

opcaoRegistro.append(txtRegistro, btnRegistro);

form.append(areaInfos, btnEntrar, btnGoogle);

main.append(tritLogo2, form, opcaoRegistro);

body.appendChild(main);

let emailUsuario = '';
let senhaUsuario = '';
let nomeUsuario = '';
let rendaUsuario = '';
const categoriasUsuario = [];

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

        areaNome.append(labelNome, obrigatorioIcon(txtNome));

        areaRight = obrigatorioIcon(txtConfirmaSenha);
        areaRight.prepend(exibirSenha(txtConfirmaSenha));
        areaConfirmaSenha.append(labelConfirmaSenha, areaRight);

        requisitos.append(requisito1, requisito2, requisito3, requisito4, requisito5);

        txtSenha.addEventListener('input', function(e){
            requisitosSenha(txtSenha.value.trim());
        })

        areaInfos.prepend(areaNome);
        areaInfos.append(areaConfirmaSenha, requisitos);

        form.appendChild(btnContinuar);
    }
    else{

        if(local == 'registro')
        {
            local = 'login';

            areaNome.remove();
            areaConfirmaSenha.remove();
            requisitos.remove();
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
        erro(msgErro, txtEmail, 'Email não foi informado!', areaInfos);
        return;
    }

    if(!txtEmail.value.includes('@') || !txtEmail.value.includes('.'))
    {
        erro(msgErro, txtEmail, 'Email inválido!', areaInfos);
        return;
    }
    
    if(txtSenha.value == '')
    {
        erro(msgErro, txtSenha, 'Senha não foi informada!', areaInfos);
        return;  
    }

    fetch("http://localhost/trit/api/acessar.php", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "email":txtEmail.value,
                "senha":txtSenha.value
            }
        ),
        })
        .then(function (resposta) {
            if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
            }
            return resposta.json();
        })
        .then(function (dadosJSON) {
            if (dadosJSON) {
                sessionStorage['logado'] = dadosJSON.usuario.Email;
                if(sessionStorage['logado'] != null){
                    window.location.href = "http://localhost/trit/home.html";
                }
                
            } else {
                erro(msgErro, null, "Email e/ou senha inválidos!", areaInfos);
            }
        })
        .catch(function (error) {
            console.warn(error);
            erro(msgErro, null, "Email e/ou senha inválidos!", areaInfos);
        })
        .finally(function () {
            // O que fazer independente de ter dado erro ou não
        });

})

btnGoogle.addEventListener('click', function(e){
    e.preventDefault();

    //entrar com google
})

let pagina = 1
let categoriaCriada = false;
let msgErroClick = false;

btnContinuar.addEventListener('click', function(e){
    e.preventDefault();

    if(pagina == 1)
    {
        if(txtNome.value == '')
        {
            erro(msgErro, txtNome, 'Nome não foi informado!', areaInfos);
            return;
        }
        
        if(txtEmail.value == '')
        {
            erro(msgErro, txtEmail, 'Email não foi informado!', areaInfos);
            return;
        }

        if(!txtEmail.value.includes('@') || !txtEmail.value.includes('.'))
        {
            erro(msgErro, txtEmail, 'Email inválido!', areaInfos);
            return;
        }
            
        if(txtSenha.value == '')
        {
            erro(msgErro, txtSenha, 'Senha não foi informada!', areaInfos); 
            return;
        }
                
        if(txtConfirmaSenha.value == '')
        {
            erro(msgErro, txtConfirmaSenha, 'Confirme a senha!', areaInfos); 
            return;
        }
                    
        if(txtSenha.value != txtConfirmaSenha.value)
        {
            erro(msgErro, txtConfirmaSenha, 'Confirmação de senha incompatível!', areaInfos); 
            return;
        }

        if(!requisito1.classList.contains('requisitoAtendido') || !requisito2.classList.contains('requisitoAtendido') || !requisito3.classList.contains('requisitoAtendido') || !requisito4.classList.contains('requisitoAtendido') || !requisito5.classList.contains('requisitoAtendido'))
        {
            erro(msgErro, txtSenha, null, null);
            return;
        }
                        
        emailUsuario = txtEmail.value;
        senhaUsuario = txtSenha.value;
        nomeUsuario = txtNome.value;

        areaInfos.remove();
        btnContinuar.remove();
        opcaoRegistro.remove();

        verificacaoCodigo();

        const caixa4 = document.querySelector('#caixa4');
        const areaVerificacao = document.querySelector('.areaVerificacao');

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
                labelRenda.classList.add('tituloPagina');

                const areaLeft = document.createElement('div');
                areaLeft.classList.add('areaLeft');

                const txtRenda = document.createElement('input');
                txtRenda.type = 'number'
                txtRenda.classList.add('inputMoeda');

                const moeda = document.createElement('p');
                moeda.textContent = 'R$';
                moeda.classList.add('moeda');


                areaLeft.append(txtRenda, moeda);
                areaRight = obrigatorioIcon(areaLeft);

                areaRenda.append(labelRenda, areaRight);

                form.append(areaRenda, btnContinuar);

                txtRenda.focus();
            });
        }

        pagina = 2;
    }

    if(pagina == 2){
        const txtRenda = document.querySelector('.inputMoeda');
        const areaRenda = document.querySelector('.infos');

        if(txtRenda.value == '')
        {
            erro(msgErro, txtRenda, 'Renda não foi informada!', areaRenda);
            return;
        }

        rendaUsuario = txtRenda.value;

        if(!rendaUsuario.includes('.'))
        {
            rendaUsuario = rendaUsuario + '.00'
        }

        areaRenda.remove();
        tritLogo2.remove();

        const header = document.createElement('header');

        const tritLogo3 = document.createElement('img');
        tritLogo3.src = 'img/logo3.png';
        tritLogo3.alt = 'logo trit';

        header.appendChild(tritLogo3);

        const areaTodasCategorias = document.createElement('div');
        areaTodasCategorias.classList.add('infos');
        areaTodasCategorias.classList.add('areaTodasCategorias');

        const todasCategorias = document.createElement('div');
        todasCategorias.classList.add('todasCategorias');

        const tituloCaregorias = document.createElement('p');
        tituloCaregorias.textContent = 'Selecione seus gastos frequentes:'
        tituloCaregorias.classList.add('titulo');
        tituloCaregorias.classList.add('tituloPagina')

        const btnNovaCategoria = document.createElement('button');
        btnNovaCategoria.classList.add('btnNovaCategoria');
        btnNovaCategoria.textContent = 'Novo gasto';

        const imgAdicionar = document.createElement('img');
        imgAdicionar.src = 'img/adicionar.svg';
        imgAdicionar.alt = 'icone adicionar';

        btnNovaCategoria.prepend(imgAdicionar);

        const categoriasSugeridas = ['Alimentação', 'Viagem', 'Lazer', 'Vestuário', 'Moradia', 'Transporte', 'Saúde', 'Fitness', 'Entretenimento', 'Pets', 'Tecnologia', 'Trabalho', 'Manutenção', 'Utilidades', 'Beleza', 'Educação', 'Farmácia', 'Eventos'];

        for (let i = 0; i < categoriasSugeridas.length; i++) {
            const categoriaSugerida = categoriasSugeridas[i];
            
            const categoria = document.createElement('div');
            categoria.classList.add('categoria');
            categoria.id = 'sugerida';

            const categoriaNome = document.createElement('p');
            categoriaNome.textContent = categoriaSugerida;

            categoria.appendChild(categoriaNome);
            todasCategorias.appendChild(categoria);

        } 

        main.classList.add('mainCategoria');
        main.prepend(header)
        todasCategorias.prepend(btnNovaCategoria);
        areaTodasCategorias.appendChild(todasCategorias);
        form.prepend(tituloCaregorias, areaTodasCategorias);
        
        clickCategorias(categoriasSugeridas);

        btnNovaCategoria.addEventListener('click', function(e){
            e.preventDefault();

            categoriaCriada = true;
            const btnCategorias = document.querySelectorAll('.categoria');
            novaCategoria(null, categoriasSugeridas, true, btnCategorias.length);

        })

        pagina = 3;
    }

    if(pagina == 3)
    {
        const categoriasSelecionadas = document.querySelectorAll('.selecionado');
        const areaTodasCategorias = document.querySelector('.areaTodasCategorias');

        if(msgErroClick)
        {
            if(categoriasSelecionadas.length == 0)
            {
                erro(msgErro, null, 'Selecione seus gastos!', areaTodasCategorias);
            }
        }
        
        msgErroClick = true;

        console.log(emailUsuario, senhaUsuario, nomeUsuario, rendaUsuario, categoriasUsuario);
        //filtrar categorias selecionadas
        //enviar as informações do console para o banco FETCH!!

    }
    
})

function erro(msgErro, input, mensagem, local){
    
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

function obrigatorioIcon(input){

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

function exibirSenha(input){

    const btnExibirSenha = document.createElement('img');
    btnExibirSenha.src = 'img/exibirSenha.svg';
    btnExibirSenha.classList.add('exibirSenha');

    let senhaExibida = false;

    btnExibirSenha.addEventListener('click', function(e){

        if(!senhaExibida)
        {
            input.setAttribute('type', 'text');
            btnExibirSenha.src = 'img/ocultarSenha.svg';
            senhaExibida = true;
        }
        else
        {
            input.setAttribute('type', 'password');
            btnExibirSenha.src = 'img/exibirSenha.svg'
            senhaExibida = false;
        }
    })

    return btnExibirSenha;
}

function requisitosSenha(senha)
{
    let r1 = false;
    let r2 = false;
    let r3 = false;
    let r4 = false;
    let r5 = false;

    if(senha.length >= 8)
    {
        r1 = true;
    }

    if(r1)
    {
        requisito1.classList.add('requisitoAtendido');
    }
    else
    {
        requisito1.classList.remove('requisitoAtendido');
    }

    r2 = /[A-Z]/.test(senha);

    if(r2)
    {
        requisito2.classList.add('requisitoAtendido');
    }
    else
    {
        requisito2.classList.remove('requisitoAtendido');
    }

    r3 = /[a-z]/.test(senha);

    if(r3)
    {
        requisito3.classList.add('requisitoAtendido');
    }
    else
    {
        requisito3.classList.remove('requisitoAtendido');
    }

    r4 = /[0-9]/.test(senha);

    if(r4)
    {
        requisito4.classList.add('requisitoAtendido');
    }
    else
    {
        requisito4.classList.remove('requisitoAtendido');
    }

    r5 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);

    if(r5)
    {
        requisito5.classList.add('requisitoAtendido');
    }
    else
    {
        requisito5.classList.remove('requisitoAtendido');
    }

}

function verificacaoCodigo (){
    const areaVerificação = document.createElement('div');
    areaVerificação.classList.add('areaVerificacao');

    const tituloVerificacao = document.createElement('p');
    tituloVerificacao.textContent = 'Verificação do email';
    tituloVerificacao.classList.add('titulo');
    tituloVerificacao.classList.add('tituloPagina');

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
            const caixa = caixas[i];

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

function botaoSair(){

    const btnSair = document.createElement('button');
    btnSair.classList.add('btnSair');

    const imgSair = document.createElement('img');
    imgSair.src = 'img/sair.png';
    imgSair.alt = 'icone sair';
    imgSair.classList.add('imgSair');

    btnSair.appendChild(imgSair);

    return btnSair;
}

function novaCategoria(categoriaAtual, categoriasSugeridas, nomeObrigatorio, codigoCategoria){
    
    const divBloqueio = document.createElement('div');
    divBloqueio.classList.add('bloqueio');

    const areaCriarCategoria = document.createElement('div');
    areaCriarCategoria.classList.add('areaCriarCategoria');
    areaCriarCategoria.classList.add('recuoPopup');

    const areaTitulo = document.createElement('div');
    areaTitulo.classList.add('tituloCategoria');

    const tituloCriarCategoria = document.createElement('p');
    tituloCriarCategoria.textContent = 'Nova categoria';
    tituloCriarCategoria.classList.add('titulo');
    tituloCriarCategoria.classList.add('tituloPopup');

    const areaNomeCategoria = document.createElement('div');
    areaNomeCategoria.classList.add('areaDigitar');

    const labelNomeCategoria = document.createElement('label');
    labelNomeCategoria.textContent = 'Nome da categoria:'

    const txtNomeCategoria = document.createElement('input');
    txtNomeCategoria.type = 'text';
    txtNomeCategoria.id = 'txtNomeCategoria';

    const areaValorCategoria = document.createElement('div');
    areaValorCategoria.classList.add('areaDigitar');

    const labelValorCategoria = document.createElement('label');
    labelValorCategoria.textContent = 'Valor limite:';

    const areaLeft = document.createElement('div');
    areaLeft.classList.add('areaLeft');

    const txtValorCategoria = document.createElement('input');
    txtValorCategoria.type = 'number';
    txtValorCategoria.id = 'txtValorCategoria';
    txtValorCategoria.classList.add('inputMoeda');

    const moeda = document.createElement('p');
    moeda.textContent = 'R$';
    moeda.classList.add('moeda');
    
    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.classList.add('btnSalvar');

    btnSair = botaoSair();

    areaTitulo.append(tituloCriarCategoria, btnSair);
    
    if(nomeObrigatorio)
    {
        areaNomeCategoria.append(labelNomeCategoria, obrigatorioIcon(txtNomeCategoria));
    }
    else
    {
        areaNomeCategoria.append(labelNomeCategoria, txtNomeCategoria);
    }
    

    areaLeft.append(txtValorCategoria, moeda);
    areaValorCategoria.append(labelValorCategoria, obrigatorioIcon(areaLeft));

    areaCriarCategoria.append(areaTitulo, areaNomeCategoria, areaValorCategoria, btnSalvar)

    main.append(divBloqueio, areaCriarCategoria);

    btnSair.addEventListener('click', function(e){
        divBloqueio.remove();
        areaCriarCategoria.remove();

        if(!categoriaCriada)
        {
            categoriaAtual.classList.remove('selecionado');
        }
    })

    btnSalvar.addEventListener('click', function(e){
        e.preventDefault();

        if(txtNomeCategoria.value == '')
        {
            erro(msgErro, txtNomeCategoria, 'Nome da categoria não foi informado!', areaValorCategoria);
            return;
        }
        if(txtValorCategoria.value == '')
        {
            erro(msgErro, txtValorCategoria, 'Valor limite não foi informado!', areaValorCategoria);
            return;
        }

        if(!categoriaAtual)
        {
            for (let i = 0; i < categoriasSugeridas.length; i++) {
            
                if(txtNomeCategoria.value.trim().toUpperCase() == categoriasSugeridas[i].toUpperCase())
                {
                    erro(msgErro, txtNomeCategoria, 'Categoria já existente!', areaValorCategoria);
                    return;
                }
            }
        }

        categoriasSugeridas.push(txtNomeCategoria.value);

        let nomeCategoriaUsuario = txtNomeCategoria.value;
        let valorCategoriaUsuario = txtValorCategoria.value;
        let codigoCategoriaUsuario = codigoCategoria;

        if(!valorCategoriaUsuario.includes('.'))
        {
            valorCategoriaUsuario = valorCategoriaUsuario + '.00'
        }

        if(categoriasUsuario.length != 0)
        {
            console.log(categoriasUsuario);

            let categoriaInclusa = false

            for (let i = 0; i < categoriasUsuario.length; i++) {
                
                if(codigoCategoria == categoriasUsuario[i].codigoCategoriaUsuario)
                {
                    categoriaInclusa = true;

                    if(txtNomeCategoria.value != categoriasUsuario[i].nomeCategoriaUsuario)
                    {
                        categoriasUsuario[i].nomeCategoriaUsuario = txtNomeCategoria.value;
                    }
                    
                    if(txtValorCategoria.value != categoriasUsuario[i].valorCategoriaUsuario)
                    {
                        categoriasUsuario[i].valorCategoriaUsuario = txtValorCategoria.value
                    }   
                }
            }

            if(!categoriaInclusa)
            {
                let categoriaUsuario = {nomeCategoriaUsuario, valorCategoriaUsuario, codigoCategoriaUsuario};
                categoriasUsuario.push(categoriaUsuario);
                console.log(categoriasUsuario);
            }
            
            
        }
        else
        {
            let categoriaUsuario = {nomeCategoriaUsuario, valorCategoriaUsuario, codigoCategoriaUsuario};
            categoriasUsuario.push(categoriaUsuario);
            console.log(categoriasUsuario);
        }

        if(categoriaCriada)
        {
            console.log('add classe')
            const todasCategorias = document.querySelector('.todasCategorias');

            const categoria = document.createElement('div');
            categoria.classList.add('categoria');
            categoria.classList.add('selecionado');

            const categoriaNome = document.createElement('p');

            txtNomeCategoria.value = txtNomeCategoria.value.charAt(0).toUpperCase() + txtNomeCategoria.value.slice(1);

            categoriaNome.textContent = txtNomeCategoria.value;

            categoria.appendChild(categoriaNome);
            todasCategorias.appendChild(categoria);

            clickCategorias(categoriasSugeridas);
        }

        divBloqueio.remove();
        areaCriarCategoria.remove();
    })

}

function clickCategorias(categoriasSugeridas){

    const btnCategorias =  document.querySelectorAll('.categoria');

    for (let i = 0; i < btnCategorias.length; i++) {
        const btnCategoria = btnCategorias[i];

        btnCategoria.setAttribute('codigo', i);
        
        btnCategoria.addEventListener('click', function(e){
            categoriaCriada = false;

            if(!btnCategoria.classList.contains('selecionado'))
            {
                console.log('add class selecionado')
                btnCategoria.classList.add('selecionado');
                click = true
    
                novaCategoria(btnCategoria, categoriasSugeridas, false, btnCategoria.getAttribute('codigo'));

                const txtNomeCategoria = document.querySelector('#txtNomeCategoria');
                txtNomeCategoria.value = btnCategoria.textContent;

                if(btnCategoria.getAttribute('id') == 'sugerida')
                {
                console.log('1')

                    txtNomeCategoria.disabled = true;
                }

                for (let index = 0; index < categoriasUsuario.length; index++) {

                    if(btnCategoria.textContent == categoriasUsuario[index].nomeCategoriaUsuario)
                    { 
                    console.log('2')
                        const txtValorCategoria = document.querySelector('#txtValorCategoria');
                        txtValorCategoria.value = categoriasUsuario[index].valorCategoriaUsuario;

                        break;
                    }
                    
                }
            }
            else
            {
                console.log('3')

                btnCategoria.classList.remove('selecionado');
                click = false
            }
        })
        
    }
}