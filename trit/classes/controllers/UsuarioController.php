<?php 
class UsuarioController {

    public static function Acessar($email, $senha) {
        $resultado = Usuario::Acessar($email, $senha);
        $usuario = null;

        foreach($resultado as $linha){
            $usuario = new Usuario($linha['nm_email'], $linha['nm_usuario']);
        }

        return $usuario;
    }

}
?>