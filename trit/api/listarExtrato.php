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
	$corpo = json_decode(file_get_contents("php://input"), true);
	if (!validaCorpoRequisicao($corpo)) {
		return;
	}
	$chaves = ['email','ano','mes'];
	if (!validaChaves($corpo, $chaves)) {
		return;
	}
	$email = $corpo['email'];
	$ano = $corpo['ano'];
	$mes = $corpo['mes'];

	ExtratoController::Listar($email, $ano, $mes);

	http_response_code(200);
	echo json_encode(['status' => 'true']);
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