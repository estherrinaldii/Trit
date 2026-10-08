<?php 
class EntradaController {

    public static function CriarEntrada($email, $nome, $valor, $data){
        return Entrada::CriarEntrada($email, $nome, $valor, $data);
    }
}
?>