<?php 
class Entrada extends Banco {
	public $Codigo;
	public $Nome;
	public $Valor;
	public $Data;
	public $Carteira;

	
	public function __construct($codigo = null, $nome = null, $valor = null, $data = null, $carteira = null) {
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->Valor = $valor;
		$this->Data = $data;
		$this->Carteira = $carteira;
	}

	public static function CriarEntrada($email, $nome, $valor, $data){
		$parametros = [
			'pEmail' => $email,
			'pNomeEntrada' => $nome,
			'pValor' => $valor,
			'pData' => $data
		];

		self::Executar('criar_entrada', $parametros);
	}
}
?>