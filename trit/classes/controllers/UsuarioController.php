<?php 
class UsuarioController {

    public function Acessar($email, $senha) {
        Usuario::Acessar($email, $senha);
    }

}
?>