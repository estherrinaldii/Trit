<?php 
class Extrato extends Banco {
	public $Origem;
	public $Codigo;
	public $Nome;
	public $Data;
	public $Valor;

	
	public function __construct($origem = null, $codigo = null,$nome = null, $data = null, $valor = null) {
		$this->Origem = $origem;
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->Data = $data;
		$this->Valor = $valor;
	}

	public static function Listar($email, $ano, $mes){
		$parametros = [
			'pEmail' => $email,
			'pAno' => $ano,
			'pMes' => $mes
		];

		return self::Consultar('listar_extrato', $parametros);
	}
}
?>