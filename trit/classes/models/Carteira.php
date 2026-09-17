<?php 
class Carteira extends Banco {
	public $Codigo;
	public $Valor;
	public $Email;

	
	public function __construct($codigo = null, $valor = null, $email = null) {
		$this->Codigo = $codigo;
		$this->Valor = $valor;
		$this->Email = $email;
	}

	public static function CriarSaidaCategorizada($email, $nome, $valor, $prazo, $tipo, $categoria){
		$parametros = [

		];
	}
}
?>