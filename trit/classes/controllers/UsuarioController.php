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

    public static function Buscar($email){
        $resultado = Usuario::Buscar($email);
        $dados = [];
        foreach($resultado as $linha){
            $dadosUsuario = new Usuario($linha['nm_email'], $linha['nm_usuario'], null, $linha['vl_renda'], $linha['qt_pontos']);
            $dadosCarteira = new Carteira($linha['cd_carteira'], $linha['vl_carteira'], $linha['nm_email']);
        }
        array_push($dados, $dadosUsuario, $dadosCarteira);
        
        return $dados;
    }

}
?>