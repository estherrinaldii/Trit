<?php 
class Carteira {
	public $Codigo;
	public $Valor;
	public $Email;

	
	public function __construct($codigo = null, $valor = null, $email = null) {
		$this->Codigo = $codigo;
		$this->Valor = $valor;
		$this->Email = $email;
	}
}
?>