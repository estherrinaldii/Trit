<?php
require_once('cors.php');
require_once('config.php');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(200);
	exit();
}
	$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo != 'PUT') 
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
	$chaves = ['nome','valor','data','prazo','tipo','status','categoria'];
	if (!validaChaves($corpo, $chaves)) {
		return;
	}
	$nome = $corpo['nome'];
	$valor = $corpo['valor'];
	$data = $corpo['data'];
	$prazo = $corpo['prazo'];
	$tipo = $corpo['tipo'];
	$status = $corpo['status'];
	$categoria = $corpo['categoria'];

	$email = $_SESSION['logado'];
	
	$saida = new SaidaController(); 
	$saida->CriarSaida($email, $nome, $valor, $data, $prazo, $tipo, $status, $categoria);

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

	//qq deu no cors?
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