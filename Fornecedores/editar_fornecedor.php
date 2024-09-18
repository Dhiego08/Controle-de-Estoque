<?php
// Recuperar dados enviados via requisição POST
$data = json_decode(file_get_contents("php://input"), true);

$idProduto = $data['id_Produto'];
date_default_timezone_set('America/Sao_Paulo'); // Define o fuso horário para o Brasil
$data_entrada = date('Y-m-d H:i:s'); // Obtém a data e hora atual do servidor no fuso horário do Brasil
$codiproduto = $data['codi_produto'];
$descricaofornecedor = $data['descricao_fornecedor'];
$cnpjfornecedor = $data['cnpj_fornecedor'];
$Telefonefornecedor = $data['Telefone_fornecedor'];
$descricaoproduto = $data['descricao_produto'];
$estiloproduto = $data['estilo_produto'];
// Obter o valor do campo ValorNf
$valornf = isset($data['valor_nf']) ? str_replace(['R$', '.', ','], ['', '', '.'], $data['valor_nf']) : null;
// Verificar se o valor está no formato correto
if (!preg_match('/^\d+(\.\d{1,2})?$/', $valornf)) {
    $response = array("success" => false, "message" => "Por favor, digite o valor corretamente, respeitando as casas decimais.");
    echo json_encode($response);
    return;
}

$qtdentrada = isset($data['qtd_entrada']) ? intval($data['qtd_entrada']) : '';

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

# Verificar se o registro a ser atualizado existe antes de realizar a atualização
$sql_check_existence = "SELECT id_produto, qtd_entrada FROM Fornecedores WHERE id_produto = '$idProduto'";
$result_check_existence = $conn->query($sql_check_existence);

if ($result_check_existence) {
    if ($result_check_existence->num_rows > 0) {
        // O registro existe, então obter a quantidade anterior antes de atualizar
        $row = $result_check_existence->fetch_assoc();
        $qtd_anterior = $row['qtd_entrada'];

        // Realizar a atualização na tabela de Fornecedores
        $sql_update_fornecedor = "UPDATE Fornecedores SET 
            data_entrada='$data_entrada',
            codi_produto='$codiproduto', 
            descricao_fornecedor='$descricaofornecedor', 
            cnpj_fornecedor='$cnpjfornecedor', 
            Telefone_fornecedor='$Telefonefornecedor', 
            descricao_produto='$descricaoproduto',
            estilo_produto='$estiloproduto',
            valor_nf='$valornf'";

        // Adicionar o campo qtd_entrada apenas se estiver preenchido
        if ($qtdentrada !== '') {
            $sql_update_fornecedor .= ", qtd_entrada='$qtdentrada'";
        }

        $sql_update_fornecedor .= " WHERE id_produto='$idProduto'";

        if ($conn->query($sql_update_fornecedor) === TRUE) {
            // Se a quantidade foi alterada, ajustar a tabela de Estoque
            if ($qtd_anterior != $qtdentrada) {
                $diferenca_quantidade = $qtdentrada - $qtd_anterior;
                $sql_update_estoque = "UPDATE Estoque SET
                    produto='$descricaoproduto',
                    qtd_entrada=qtd_entrada + '$diferenca_quantidade',
                    total_estoque = total_estoque + '$diferenca_quantidade'
                    WHERE codi_produto='$codiproduto'";
        
                if ($conn->query($sql_update_estoque) === TRUE) {
                    $response = array("success" => true, "action" => "update");
                    echo json_encode($response);
                } else {
                    $response = array("success" => false, "error" => $conn->error);
                    echo json_encode($response);
                }
            } else {
                // Se a descrição do produto foi alterada, ajustar na tabela de Estoque
                $sql_update_estoque_descricao = "UPDATE Estoque SET produto='$descricaoproduto' WHERE codi_produto='$codiproduto'";
                
                if ($conn->query($sql_update_estoque_descricao) === TRUE) {
                    $response = array("success" => true, "action" => "update");
                    echo json_encode($response);
                } else {
                    $response = array("success" => false, "error" => $conn->error);
                    echo json_encode($response);
                }
            }
        } else {
            $response = array("success" => false, "error" => $conn->error);
            echo json_encode($response);
        }
    } else {
        $response = array("success" => false, "message" => "O registro a ser atualizado não foi encontrado.");
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "error" => $conn->error);
    echo json_encode($response);
}

$conn->close();
?>

