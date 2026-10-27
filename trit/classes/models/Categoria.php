<?php
class Categoria extends Banco
{
	public $Codigo;
	public $Nome;
	public $ValorLimite;
	public $Email;
	public $Tipo;


	public function __construct($codigo = null, $nome = null, $valorLimite = null, $email = null, $tipo = null)
	{
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->ValorLimite = $valorLimite;
		$this->Email = $email;
		$this->Tipo = $tipo;
	}

	public static function Listar($email)
	{
		$parametros = [
			"pEmail" => $email
		];
		return self::Consultar('listar_categorias', $parametros);
	}

	public static function Criar($nome, $email, $valorLimite){
		$parametros = [
			'pNomeCategoria'=> $nome,
			'pEmail'=> $email,
			'pValorLimite'=> $valorLimite
		];
		return self::Executar('criar_categoria', $parametros);
	}

	public static function Deletar($email, $codigo){
		$parametros = [
			'pEmail' => $email,
			'pCodigoCategoria' => $codigo
		];
		return self::Executar('deletar_categoria', $parametros);
	}

	public static function Editar(){
		
	}
}
?>