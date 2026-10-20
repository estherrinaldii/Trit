<?php 
class MovimentacaoCofrinho extends Banco {
	public $Codigo;
	public $Valor;
	public $Data;
	public $Tipo;
	public $Cofrinho;

	
	public function __construct($codigo = null, $valor = null, $data = null, $tipo = null, $cofrinho = null) {
		$this->Codigo = $codigo;
		$this->Valor = $valor;
		$this->Data = $data;
		$this->Tipo = $tipo;
		$this->Cofrinho = $cofrinho;
	}

	public static function Guardar($email, $codigoCofrinho, $valor){
		$parametros = [
			'pEmail' => $email,
			'pCodigoCofrinho' => $codigoCofrinho,
			'pValor' => $valor
		];

		return self::Executar('guardar_cofrinho', $parametros);
	}

	public static function Resgatar($email, $codigoCofrinho, $valor){
		$parametros = [
			'pEmail' => $email,
			'pCodigoCofrinho' => $codigoCofrinho,
			'pValor' => $valor
		];

		return self::Executar('guardar_cofrinho', $parametros);
	}
}
?>