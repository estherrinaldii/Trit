<?php 
class SaidaController {

    public static function CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria){
        Saida::CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria);
    }

    public static function Listar($email){
        $resultado = Saida::Listar($email);
        $saidas = [];

        foreach ($resultado as $linha) {
            $saida = new Saida($linha['cd_saida'], $linha[''], $linha[''], $linha['']);
        }
    }
}
?>