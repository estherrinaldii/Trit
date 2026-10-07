<?php 
class SaidaController {

    public static function CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria){
        Saida::CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria);
    }

    // public static function ListarCategorizadas($email, $tipo){
    //     $resultado = Saida::ListarCategorizadas($email, $tipo);
    //     $saidas = [];
        
    //     foreach ($resultado as $linha) {
    //         $carteira = new Carteira($linha['cd_carteira'], $linha['vl_carteira'], $linha['FK_nm_email']);
    //         $categoria = new Categoria($linha['cd_categoria_gasto'], $linha['nm_categoria_gasto'], $linha['vl_limite'], $linha['FK_nm_email'], $linha['ic_tipo_categoria']);

    //         $saida = new Saida($linha['cd_saida'], $linha['nm_saida'], $linha['vl_saida'], $linha['dt_saida'], $linha['dt_prazo_saida'], $linha['ic_tipo_saida'], $linha['ic_status_saida'], $carteira, $categoria);
    //         array_push($saidas, $saida);
    //     }
    //     return $saidas;
    // }
}
?>