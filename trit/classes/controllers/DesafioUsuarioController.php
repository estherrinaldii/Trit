<?php 
class DesafioUsuarioController {
    public static function Listar($email){
        $resposta = DesafioUsuario::Listar($email);
        $desafios = [];

        foreach($resposta as $linha){
            $desafioUsuario = new DesafioUsuario($linha['cd_desafio_usuario'], $linha['FK_cd_desafio'], $linha['nm_desafio'], $linha['FK_nm_email'], $linha['ic_concluido']);

            array_push($desafios, $desafioUsuario);
        }

        return $desafios;
    }
	
	public static function Verificar($email){
        return DesafioUsuario::Verificar($email);
    }
}
?>