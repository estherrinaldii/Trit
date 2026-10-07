<?php 
class Usuario extends Banco{
	public $Email;
	public $Nome;
	public $Senha;
	public $Renda;
	public $Pontos;

	public function __construct($email = null, $nome = null, $senha = null, $renda = null, $pontos = null) {
		$this->Email = $email;
		$this->Nome = $nome;
		$this->Senha = $senha;
		$this->Renda = $renda;
		$this->Pontos = $pontos;
	}

	public static function Acessar($email, $senha){
		$parametros = [
			'pEmail' => $email,
			'pSenha' => $senha
		];

		return self::Consultar('acessar', $parametros);
	}

	public static function Buscar($email){
		$parametros = [
			'pEmail' => $email
		];

		return self::Consultar('buscar_dados_usuario', $parametros);
	}
}
?>