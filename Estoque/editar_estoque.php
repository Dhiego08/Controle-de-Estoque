<?php
// Recuperar dados enviados via requisição POST
$data = json_decode(file_get_contents("php://input"), true);


date_default_timezone_set('America/Sao_Paulo'); // Define o fuso horário para o Brasil
$data_entrada = date('Y-m-d H:i:s'); // Obtém a data e hora atual do servidor no fuso horário do Brasil
$codiproduto = $data['codi_produto'];
$produto = $data['produto'];
$localizacaoestoque = $data['localizacao_estoque'];
$qtdentrada = isset($data['qtd_entrada']) ? intval($data['qtd_entrada']) : 0;
$qtdsaida = isset($data['qtd_saida']) ? intval($data['qtd_saida']) : 0;
$totalestoque = isset($data['total_estoque']) ? intval($data['total_estoque']) : 0;

// Conectar ao banco de dados (substituir pelas suas credenciais)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Controle_Estoque";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$idmovimentacao = $data['id_movimentacao'];
// Verificar se o registro a ser atualizado existe antes de realizar a atualização
$sql_check_existence = "SELECT id_movimentacao, qtd_entrada, qtd_saida, total_estoque FROM Estoque WHERE id_movimentacao = '$idmovimentacao'";
$result_check_existence = $conn->query($sql_check_existence);

if ($result_check_existence->num_rows > 0) {
    // O registro existe, então realizar a atualização
    $row = $result_check_existence->fetch_assoc();
    
    // Realizar cálculos para atualizar os valores de estoque
    $qtdentradaAntiga = intval($row['qtd_entrada']);
    $qtdsaidaAntiga = intval($row['qtd_saida']);
    $totalestoqueAntigo = intval($row['total_estoque']);

    $qtdentradaTotal = $qtdentradaAntiga + $qtdentrada;
    $qtdsaidaTotal = $qtdsaidaAntiga + $qtdsaida;
    $totalestoqueNovo = $totalestoqueAntigo + $qtdentrada - $qtdsaida;

    // Atualizar o estoque no banco de dados
    $sql = "UPDATE Estoque SET 
        data_entrada='$data_entrada', 
        produto='$produto', 
        localizacao_estoque='$localizacaoestoque', 
        qtd_entrada='$qtdentradaTotal', 
        qtd_saida='$qtdsaidaTotal', 
        total_estoque='$totalestoqueNovo' 
        WHERE id_movimentacao='$idmovimentacao'";

    if ($conn->query($sql) === TRUE) {
        $response = array("success" => true, "action" => "update");
        echo json_encode($response);
    } else {
        $response = array("success" => false, "error" => $conn->error);
        echo json_encode($response);
    }
} else {
    // Se o registro não existe, retornar erro ou tratar conforme a necessidade
    $response = array("success" => false, "error" => "Registro não encontrado.");
    echo json_encode($response);
}

$conn->close();
?>
