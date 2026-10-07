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

try {
	if (!isset($_SESSION['logado']) || $_SESSION['logado'] == '') {
		http_response_code(400);
		echo json_encode(['mensagem' => 'Parâmetros obrigatórios insuficientes']);
		return;
	}
	$email = $_SESSION['logado'];

	$dadosUsuario = UsuarioController::Buscar($email);

	http_response_code(200);
	echo json_encode(['status' => 'true', 'usuario'=>$dadosUsuario]);
} catch (Exception $erro) {
	http_response_code(500);
	echo json_encode(['status' => 'false']);
}