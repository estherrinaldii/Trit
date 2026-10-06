<?php 
class Saida extends Banco {
	public $Codigo;
	public $Nome;
	public $Valor;
	public $Prazo;
	public $Tipo;
	public $Status;
	public $Categoria;

	
	public function __construct($codigo = null, $nome = null, $valor = null, $prazo = null, $tipo = null, $status = null, $categoria = null) {
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->Valor = $valor;
		$this->Prazo = $prazo;
		$this->Tipo = $tipo;
		$this->Status = $status;
		$this->Categoria = $categoria;
	}

	public static function CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria){
		$parametros = [
			'pEmail' => $email,
			'pNomeSaida' => $nome,
			'pValor' => $valor,
			'pData' => $data,
			'pPrazo' => $prazo,
			'pTipo' => $tipo,
			'pStatus' => $status,
			'pCategoriaGasto' => $categoria
		];

		return self::Executar('criar_saida', $parametros);
	}

	public static function Listar($email){
		$parametros = [
			'pEmail' => $email
		];
		
		return self::Consultar('listar_saidas', $parametros);
	}

	
}
?>