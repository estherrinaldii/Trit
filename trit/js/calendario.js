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
