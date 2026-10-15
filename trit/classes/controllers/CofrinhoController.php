<?php 
class CofrinhoController {

    public static function Listar($email){
        $resposta = Cofrinho::Listar($email);
        $cofrinhos = [];
        
        foreach($resposta as $linha){
            $planta = new Planta($linha['cd_planta']);

            $cofrinho = new Cofrinho($linha['cd_cofrinho'],
            $linha['nm_cofrinho'],
            $linha['dt_cofrinho'],
            $linha['dt_prazo'],
            $linha['vl_cofrinho_final'],
            $linha['ic_tipo_cofrinho'],
            $linha['vl_cofrinho_atual'],
            $planta);

            array_push($cofrinhos, $cofrinho);
        }

        return $cofrinhos;
    }

    public static function Deletar($email, $codigo){
        return Cofrinho::Deletar($email, $codigo);
    }

    public static function Editar($email, $codigo, $nome, $valorFinal, $prazo, $planta){
        return Cofrinho::Editar($email, $codigo, $nome, $valorFinal, $prazo, $planta);
    }
}
?>