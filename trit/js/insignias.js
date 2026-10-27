import { qualPagina } from "./conta.js";

console.log(qualPagina)

const btnVoltar = document.querySelector('.btnVoltar')

btnVoltar.addEventListener('click', function(e){
    e.preventDefault();
    
    window.location.href = "http://localhost/Trit/trit/trit/conta.html";
})      