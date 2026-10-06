<?php 
class SaidaController {

    public static function CriarSaidaCategorizada($email, $nome, $valor, $tipo, $categoria, $data){
        $resultado = Saida::CriarSaidaCategorizada($email, $nome, $valor, $tipo, $categoria, $data);
        $saida = null;

        foreach($resultado as $linha){
            $saida = new Saida($linha['nm_email']);
        }

        return $saida;
    }

    public static function Listar($email){
        $resultado = Saida::Listar($email);
        $saidas = [];

        // foreach ($resultado as $linha) {
        //     $saida = new Saida($linha['cd_saida'], $linha[''], $linha[''], $linha[''])
        // }
    }
}
?>