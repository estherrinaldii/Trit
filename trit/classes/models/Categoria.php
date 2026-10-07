<?php 
class Categoria {
	public $Codigo;
	public $Nome;
	public $ValorLimite;
	public $Email;
	public $Tipo;

	
	public function __construct($codigo = null, $nome = null, $valorLimite = null, $email = null, $tipo = null) {
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->ValorLimite = $valorLimite;
		$this->Email = $email;
		$this->Tipo = $tipo;
	}
}
?>