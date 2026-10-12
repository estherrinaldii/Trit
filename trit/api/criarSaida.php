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
		exit();
	}
 
	// Campos que precisam vir sempre
	$obrigatorios = ['nome', 'valor', 'data'];
	
	// Campos que podem faltar ou vir vazios (viram NULL)
	$opcionais = ['prazo', 'tipo', 'status', 'categoria', 'parcelas'];
 
	if (!validaChaves($corpo, $obrigatorios)) {
		exit();
	}
 
	$nome = $corpo['nome'];
	$valor = $corpo['valor'];
	$data = $corpo['data'];
 
	$opcional = [];
	foreach ($opcionais as $campo) {
		$v = $corpo[$campo] ?? null;
		$opcional[$campo] = ($v === '') ? null : $v;
	}
 
	// Parcelas: obrigatório (inteiro >= 1) só quando a saída é parcelada
	if (strtolower((string)$opcional['tipo']) === 'parcelada') {
		$parcelas = filter_var($opcional['parcelas'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
		if ($parcelas === false) {
			http_response_code(400);
			echo json_encode(['mensagem' => 'Número de parcelas inválido ou não informado.']);
			exit();
		}
		$opcional['parcelas'] = $parcelas;
	} else {
		$opcional['parcelas'] = null;
	}

	$email = $_SESSION['logado'];
 
	SaidaController::CriarSaida(
		$email,
		$nome,
		$valor,
		$data,
		$opcional['prazo'],
		$opcional['tipo'],
		$opcional['status'],
		$opcional['categoria'],
		$opcional['parcelas']
	);
 
	http_response_code(200);
	echo json_encode(['status' => 'true']);
} catch (Exception $erro) {
	http_response_code(500);
	echo json_encode(['status' => 'false', 'mensagem'=>$erro->getMessage()]);
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