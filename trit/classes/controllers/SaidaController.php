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
}
?>