<?php 
class ExtratoController {
    public static function Listar($email, $ano, $mes){
        $resposta = Extrato::Listar($email, $ano, $mes);
        $itensExtrato = [];

        foreach($resposta as $linha){
            $item = new Extrato($linha['origem'], $linha['codigo'], $linha['nome'],  $linha['data'], $linha['valor']);
            array_push($itensExtrato, $item);
        }

        return $itensExtrato;
    }
}
?>