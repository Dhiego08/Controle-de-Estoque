<?php
$data = json_decode(file_get_contents("php://input"), true);

// Seção de validação de entrada - Verificar se os valores numéricos foram digitados corretamente
$valores_numericos = ['custo_compra', 'preco_compra', 'preco_venda', 'preco_lucro'];
foreach ($valores_numericos as $valor) {
    if (!preg_match('/^(?:R\$?\s*)?\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/', $data[$valor])) {
        $response = array("success" => false, "message" => "Por favor, digite os valores numéricos corretamente, respeitando as casas decimais.");
        echo json_encode($response);
        return;
    }
}

$idmovimentacao = $data['id_movimentacao'];
date_default_timezone_set('America/Sao_Paulo');
$data_entrada = date('y-m-d H:i:s');
$codiproduto = $data['codi_produto'];
$produto = $data['produto'];
$estiloproduto = $data['estilo_produto'];

$custocompra = isset($data['custo_compra']) ? str_replace(['R$', '.', ','],['', '','.'], $data['custo_compra']): null;
$precocompra = isset($data['preco_compra']) ? str_replace(['R$', '.', ','],['', '','.'], $data['preco_compra']): null;
$precovenda = isset($data['preco_venda']) ? str_replace(['R$', '.', ','],['', '','.'], $data['preco_venda']): null;
$tiposaida = $data['tipo_saida'];
$precolucro = isset($data['preco_lucro']) ? str_replace(['R$', '.', ','],['', '','.'], $data['preco_lucro']): null;

# CONEXÃO AO BANCO DE DADOS
$servername = "localhost";
$username = "root";
$password = "diego238563";
$dbname = "Controle_Estoque";

# VERIFICAR A CONEXÃO AO BANCO DE DADOS.
$conn = new mysqli($servername, $username, $password, $dbname);

$sql_update_movimentacao = "UPDATE Movimentacao SET
data_entrada='$data_entrada',
codi_produto='$codiproduto',
produto='$produto',
estilo_produto='$estiloproduto',
custo_compra='$custocompra',
preco_compra='$precocompra',
preco_venda='$precovenda',
tipo_saida='$tiposaida',
preco_lucro='$precolucro'
WHERE id_movimentacao = $idmovimentacao";

// Após a atualização, verifique se houve algum erro
if ($conn->query($sql_update_movimentacao) === TRUE) {
    // Se a atualização foi bem-sucedida, retorne um JSON indicando sucesso
    $response = array("success" => true, "Dados atualizados com sucesso!");
    echo json_encode($response);
} else {
    // Se houve um erro, retorne um JSON indicando falha com a mensagem de erro
    $response = array("success" => false, "message" => "Erro ao atualizar a movimentação: " . $conn->error);
    echo json_encode($response);
}

$conn->close();
?>
