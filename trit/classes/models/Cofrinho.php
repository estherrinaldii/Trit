<?php 
class Cofrinho extends Banco {
	public $Codigo;
	public $Nome;
	public $Data;
	public $Prazo;
	public $ValorFinal;
	public $Tipo;
	public $ValorAtual;
	public $Planta;

	
	public function __construct($codigo = null, $nome = null, $data = null, $prazo = null, $valorFinal = null, $tipo = null, $valorAtual = null, $planta = null) {
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->Data = $data;
		$this->Prazo = $prazo;
		$this->ValorFinal = $valorFinal;
		$this->Tipo = $tipo;
		$this->ValorAtual = $valorAtual;
		$this->Planta = $planta;
	}

	public static function Listar($email){
		$parametros = [
			'pEmail' => $email
		];

		return self::Consultar('listar_cofrinhos', $parametros);
	}

	public static function Deletar($email, $codigo){
		$parametros = [
			'pEmail' => $email,
			'pCodigoCofrinho' => $codigo
		];

		return self::Executar('deletar_cofrinho', $parametros);
	}

	public static function Editar($email, $codigo, $nome, $valorFinal, $prazo, $planta){
		$parametros = [
			'pEmail' => $email,
			'pCodigoCofrinho' => $codigo,
			'pNovoNome' => $nome,
			'pNovoValorFinal' => $valorFinal,
			'pNovoPrazo' => $prazo,
			'pNovaPlanta' => $planta
		];

		return self::Executar('editar_cofrinho', $parametros);
	}

	public static function Criar($email, $nome, $tipo, $valorFinal, $prazo, $planta){
	$parametros = [
		'pEmail' => $email,
		'pNomeCofrinho' => $nome,
		'pTipo' => $tipo,
		'pValorFinal' => $valorFinal,
		'pPrazo' => $prazo,
		'pPlanta' => $planta
	];

	return self::Executar('criar_cofrinho', $parametros);
}
}
?>