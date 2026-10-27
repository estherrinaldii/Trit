<?php 
class InsigniasUsuario extends Banco {
	public $Email;
	public $Codigo;

	
	public function __construct($email = null, $codigo = null) {
		$this->Email = $email;
		$this->Codigo = $codigo;
	}

	public static function Primeiro_cofrinho_criado($email){
		$parametros = [
			"pEmail" => $email
		];
		
		return self::Executar('calcular_primeiro_cofrinho_completado', $parametros);
	}
}
?>