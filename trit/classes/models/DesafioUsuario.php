<?php 
class DesafioUsuario extends Banco {
	public $Codigo;
	public $CodigoDesafio;
	public $Nome;
	public $Email;
	public $Status;
	public $Data;

	
	public function __construct($codigo = null, $codigoDesafio = null, $nome = null, $email = null, $status = null, $data = null) {
		$this->Codigo = $codigo;
		$this->CodigoDesafio = $codigoDesafio;
		$this->Nome = $nome;
		$this->Email = $email;
		$this->Status = $status;
		$this->Data = $data;
	}

	public static function Listar($email){
		$parametros = [
			'pEmail' => $email
		];

		return self::Consultar('listar_desafios_usuario', $parametros);
	}
	
	public static function Verificar($email){
		$parametros = [
			'pEmail' => $email
		];

		return self::Executar('verificar_desafios', $parametros);
	}
}
?>