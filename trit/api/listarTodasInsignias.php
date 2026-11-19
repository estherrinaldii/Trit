<?php
require_once('cors.php');
require_once('config.php');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo != 'GET') 
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
	$email = $_SESSION['logado'];
	
	$insiginias = InsigniaController::ListarTodas();

	http_response_code(200);
	echo json_encode(['status' => 'true', 'insignias' => $insiginias]);
} catch (Exception $erro) {
	$mensagemCompleta = $erro->getMessage();
	if (strpos($mensagemCompleta, 'SQLSTATE') !== false && strpos($mensagemCompleta, '1644') !== false) {
		$partes = explode(': ', $mensagemCompleta);
		$mensagem = trim(end($partes));
		$mensagem = substr($mensagem, 5);
	} else {
		$mensagem = $mensagemCompleta;
	}

	http_response_code(500);
	echo json_encode(['status' => 'false', 'mensagem' => $mensagem]);
}