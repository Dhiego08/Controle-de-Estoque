<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "diego238563";
    $dbname = "Controle_Estoque";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array("success" => false, "message" => "Conexão falhou: " . $conn->connect_error);
    } else {
        $data = json_decode(file_get_contents("php://input"), true);

        date_default_timezone_set('America/Sao_Paulo'); // Define o fuso horário para o Brasil
        $data_entrada = date('Y-m-d H:i:s'); // Obtém a data e hora atual do servidor no fuso horário do Brasil
        $codi_produto = $data['codi_produto'];
        $descricao_fornecedor = $data['descricao_fornecedor'];
        $cnpj_fornecedor = $data['cnpj_fornecedor'];
        $Telefone_fornecedor = $data['Telefone_fornecedor'];
        $descricao_produto = $data['descricao_produto'];
        $estilo_produto = $data['estilo_produto'];
        
        $valornf = isset($data['valor_nf']) ? str_replace(['R$', '.', ','], ['', '', '.'], $data['valor_nf']) : null;
        if (!preg_match('/^\d+(\.\d{1,2})?$/', $valornf)) {
            $response = array("success" => false, "message" => "Por favor, digite o valor corretamente, respeitando as casas decimais.");
            echo json_encode($response);
            return;
        }
        $qtd_entrada = $data['qtd_entrada'];

        $check_sql = "SELECT codi_produto, descricao_produto FROM Fornecedores WHERE codi_produto = '$codi_produto' OR descricao_produto = '$descricao_produto'";
        $check_result = $conn->query($check_sql);

        if ($check_result->num_rows > 0) {
            $row = $check_result->fetch_assoc();
            if ($row['codi_produto'] === $codi_produto && $row['descricao_produto'] === $descricao_produto) {
                $response = array("success" => true, "message" => "Cadastro feito com sucesso! Produto já existente compatível.");

                $sql = "INSERT INTO Fornecedores (data_entrada, codi_produto, descricao_fornecedor, cnpj_fornecedor, Telefone_fornecedor, descricao_produto, estilo_produto, valor_nf, qtd_entrada) 
                        VALUES ('$data_entrada', '$codi_produto', '$descricao_fornecedor', '$cnpj_fornecedor', '$Telefone_fornecedor', '$descricao_produto', '$estilo_produto', '$valornf', '$qtd_entrada')";

                if ($conn->query($sql) !== TRUE) {
                    $response = array("success" => false, "message" => "Erro ao cadastrar: " . $conn->error);
                }
            } else {
                $response = array("success" => false, "message" => "Código de produto já cadastrado com outro produto. Favor preencher corretamente.");
            }
        } else {
            $sql = "INSERT INTO Fornecedores (codi_produto, data_entrada, descricao_fornecedor, cnpj_fornecedor, Telefone_fornecedor, descricao_produto, estilo_produto, valor_nf, qtd_entrada) 
                     VALUES ('$codi_produto', '$data_entrada', '$descricao_fornecedor', '$cnpj_fornecedor', '$Telefone_fornecedor', '$descricao_produto', '$estilo_produto', '$valornf', '$qtd_entrada')";

            if ($conn->query($sql) !== TRUE) {
                $response = array("success" => false, "message" => "Erro ao cadastrar: " . $conn->error);
            } else {
                $response = array("success" => true, "message" => "Cadastro feito com sucesso!");
            }
        }
    }
}

/*************************************************************************************************************************************************************************************************************************************/
$preco_compra = isset($data['preco_compra']) ? str_replace(['R$', '.', ','], ['', '', '.'], $data['preco_compra']) : null;

// INSERÇÃO NA TABELA MOVIMENTAÇÃO
    if ($response["success"]) {
// Calcula o preço de compra
        $preco_compra = round(floatval($valornf) / intval($qtd_entrada), 2);  // Usando round para arredondar para duas casas decimais
    
        $sql_movimentacao = "INSERT INTO Movimentacao (data_entrada, codi_produto, produto, estilo_produto, custo_compra, preco_compra) 
                    VALUES ('$data_entrada', '$codi_produto', '$descricao_produto', '$estilo_produto', '$valornf', '$preco_compra')";

        if ($conn->query($sql_movimentacao) !== TRUE) {
            $response = array("success" => false, "message" => "Erro ao cadastrar na tabela Movimentacao: " . $conn->error);
        } else {
            $response["message"] .= " Cadastro na tabela Movimentacao feito com sucesso!";
        }
    }




/**************************************************************************************************************************************************************************************************************************************/
if ($response["success"]) {
    $data_entrada = date('Y-m-d H:i:s');
    $codi_produto = $data['codi_produto'];
    $descricao_produto = $data['descricao_produto'];
    $qtd_entrada = $data['qtd_entrada'];

    // Cálculo do estoque total
    $sql_select_total_estoque = "SELECT total_estoque FROM Estoque WHERE codi_produto = '$codi_produto'";
    $result = $conn->query($sql_select_total_estoque);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $total_estoque = $row["total_estoque"] + $qtd_entrada;
    } else {
        $total_estoque = $qtd_entrada;
    }

    // Inserção na tabela de estoque
    $sql_estoque = "INSERT INTO Estoque (data_entrada, codi_produto, produto, qtd_entrada, total_estoque) 
                    VALUES ('$data_entrada', '$codi_produto', '$descricao_produto', '$qtd_entrada', '$qtd_entrada')";

    if ($conn->query($sql_estoque) !== TRUE) {
        $response = array("success" => false, "message" => "Erro ao cadastrar na tabela Estoque: " . $conn->error);
    } else {
        $response["message"] .= " Cadastro na tabela Estoque feito com sucesso!";
    }
}

    if (!headers_sent()) {
    header('Content-Type: application/json');
    }



echo json_encode($response);
?>
