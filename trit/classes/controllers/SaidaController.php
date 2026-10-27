<?php
class SaidaController
{

    public static function CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria, $parcelas = null)
    {
        return Saida::CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria, $parcelas);
    }

    public static function CalcularValorGastoCategoria($email, $categoria){
        $resultado = Saida::CalcularValorGastoCategoria($email, $categoria);

        $total = $resultado[0]['total'] ?? 0;
        
        return $total;  
    }
}
?>