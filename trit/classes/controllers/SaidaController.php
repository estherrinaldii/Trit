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

    public static function ListarPendentes($email) {
        $resposta = Saida::ListarPendentes($email);
        $pendentes = [];

        foreach ($resposta as $linha){
            $pendente = new Saida($linha["cd_saida"], $linha["nm_saida"], $linha["vl_saida"], $linha["dt_saida"], $linha["dt_prazo_saida"], $linha["ic_tipo_saida"], $linha["ic_status_saida"], null, null, $linha["qt_parcelas"]);
            array_push($pendentes, $pendente);
        }
        return $pendentes;
    }

    public static function ListarTipos($email, $tipo){
        if($tipo != 'fixa' && $tipo != 'parcelada' && $tipo != 'categorizada'){
            throw new Exception('Tipo de saída inválido');
        }

        $resposta = Saida::ListarTipos($email, $tipo);
        $saidas = [];

        foreach ($resposta as $linha){
            $saida = new Saida($linha["cd_saida"], $linha["nm_saida"], $linha["vl_saida"], $linha["dt_saida"], $linha["dt_prazo_saida"], $tipo, $linha["ic_status_saida"], $linha["cd_carteira"], $linha["FK_cd_categoria_gasto"], $linha["qt_parcelas"]);
            array_push($saidas, $saida);
        }
        return $saidas;
    }
}
?>