<?php 
class InsigniaController {
    public static function Listar($email){
        $resposta = Insignia::Listar($email);
        $insignias = [];

        foreach ($resposta as $linha){
           
            $insignia = new Insignia($linha['FK_cd_insignia'], $linha['nm_insignia'], $linha['nm_tipo_insignia']);
            array_push($insignias, $insignia);
        }
        return $insignias;
    }

    public static function ListarTodas(){
        $resposta = Insignia::ListarTodas();
        $insignias = [];

        foreach ($resposta as $linha){
           
            $insignia = new Insignia($linha['cd_insignia'], $linha['nm_insignia'], $linha['nm_tipo_insignia']);
            array_push($insignias, $insignia);
        }
        return $insignias;
    }


}
?>