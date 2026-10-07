<?php 
class UsuarioController {

    public static function Acessar($email, $senha) {
        $resultado = Usuario::Acessar($email, $senha);
        $usuario = null;

        foreach($resultado as $linha){
            $usuario = new Usuario($linha['nm_email'], $linha['nm_usuario']);
        }  

        if($usuario != null){
            $resultado = Usuario::Buscar($usuario->Email);
            $dados = [];
            foreach($resultado as $linha){
                $dadosUsuario = new Usuario($usuario->Email, $usuario->Nome, null, $linha['vl_renda'], $linha['qt_pontos']);
                $dadosCarteira = new Carteira($linha['cd_carteira'], $linha['vl_carteira'], $usuario->Email);
            }
            array_push($dados, $dadosUsuario, $dadosCarteira);
        }

        return $usuario;
        return $dados;
    }

}
?>