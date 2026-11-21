<?php 
class Saida extends Banco {
	public $Codigo;
	public $Nome;
	public $Valor;
	public $Data;
	public $Prazo;
	public $Tipo;
	public $Status;
	public $Carteira;
	public $Categoria;
	public $Parcelas;

	
	public function __construct($codigo = null, $nome = null, $valor = null, $data = null, $prazo = null, $tipo = null, $status = null, $carteira = null, $categoria = null, $parcelas = null) {
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->Valor = $valor;
		$this->Data = $data;
		$this->Prazo = $prazo;
		$this->Tipo = $tipo;
		$this->Status = $status;
		$this->Carteira = $carteira;
		$this->Categoria = $categoria;
		$this->Parcelas = $parcelas;
	}

	public static function CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria, $parcelas = null){
		$parametros = [
			'pEmail' => $email,
			'pNomeSaida' => $nome,
			'pValor' => $valor,
			'pData' => $data,
			'pPrazo' => $prazo,
			'pTipo' => $tipo,
			'pStatus' => $status,
			'pCategoriaGasto' => $categoria,
			'pParcelas' => $parcelas
		];
		
		return self::Executar('criar_saida', $parametros);
	}

	public static function CalcularValorGastoCategoria($email, $categoria){
		$parametros = [
			'pEmail' => $email,
			'pcategoria' => $categoria
		];
		
		return self::Consultar('calcularValorGastoCategoria', $parametros);
	}

	public static function ListarPendentes($email){
		$parametros = [
			'pEmail' => $email
		];

		return self::Consultar('listar_saidas_pendentes', $parametros);
	}

	public static function ListarTipos($email, $tipo){
		$parametros = [
			'pEmail' => $email,
			'pTipo' => $tipo
		];

		return self::Consultar('listar_saidas_por_tipo', $parametros);
	}
}
?>