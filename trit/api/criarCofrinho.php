<?php
require_once('cors.php');
require_once('config.php');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(200);
	exit();
}

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo != 'POST') 
{ 
	http_response_code(400); 
	echo json_encode(['mensagem' => 'Método Inválido']); 
	return;
}

if(!isset($_SESSION['logado'])){
	http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'mensagem' => 'Sessão inválida ou não encontrada.'
    ]);
    exit;
}
 
try {
	$corpo = json_decode(file_get_contents("php://input"), true);
	if (!validaCorpoRequisicao($corpo)) {
		return;
	}
	$chaves = ['email','nome','tipo','valor_final','planta'];
	if (!validaChaves($corpo, $chaves)) {
		return;
	}
	$email = $corpo['email'];
	$nome = $corpo['nome'];
	$tipo = $corpo['tipo'];
	$valorFinal = $corpo['valor_final'];
	$planta = $corpo['planta'];
 
	if ($tipo != 'determinado' && $tipo != 'indeterminado') {
		http_response_code(400);
		echo json_encode(['mensagem' => 'Tipo inválido!']);
		return;
	}
 
	$prazo = null;
	if ($tipo == 'determinado') {
		if (!validaChaves($corpo, ['prazo'])) {
			return;
		}
		$prazo = $corpo['prazo'];
	}
 
	CofrinhoController::Criar($email, $nome, $tipo, $valorFinal, $prazo, $planta);
	
	http_response_code(200);
	echo json_encode(['status' => 'true']);
} catch (Exception $erro) {
	http_response_code(500);
	echo json_encode(['status' => 'false']);
}

function validaCorpoRequisicao($corpo) {
	if (is_null($corpo))
	{
		http_response_code(400);
		echo json_encode(['mensagem'=>'Dados Inválidos!']);
		return false;
	}
	return true;
}

function validaChaves($corpo, $campos) {
	for ($i=0; $i < count($campos); $i++) { 
		if (!array_key_exists($campos[$i], $corpo))
		{
			http_response_code(400);
			echo json_encode(['mensagem'=>'Dados incorretos. Verifique a documentação da API e tente novamente!']);
			return false;
		}
		if ($corpo[$campos[$i]] == ''){
			http_response_code(400);
			echo json_encode(['mensagem'=>'Dados incorretos. Verifique a documentação da API e tente novamente!']);
			return false;
		}
	}
	return true;
}
?>