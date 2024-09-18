<?php
// Recupera os dados enviados via requisição POST
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$nome = $data['nome'];
$tipo = $data['tipo'];
$status = $data['status'];
$telefones = isset($data['telefones']) ? $data['telefones'] : [];

// Conecta ao banco de dados (substitua pelas suas credenciais)
$servername = "localhost";
$username = "root";
$password = "diego238563";
$dbname = "Controle_Estoque";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Atualiza os dados do colaborador no banco de dados
$sql = "UPDATE Usuario SET nome_usuario='$nome', tipo_usuario='$tipo', status_usuario='$status' WHERE id_usuario='$id'";

if ($conn->query($sql) === TRUE) {
    // Recupere os telefones atuais do colaborador no banco de dados
    $sqlTelefones = "SELECT numero_telefone FROM telefone WHERE id_usuario='$id'";
    $resultTelefones = $conn->query($sqlTelefones);

    $telefonesAtuais = [];
    while ($row = $resultTelefones->fetch_assoc()) {
        $telefonesAtuais[] = $row['numero_telefone'];
    }

    // Compare os telefones atuais com os novos e atualize apenas os que foram modificados
    foreach ($telefones as $telefone) {
        if (!in_array($telefone, $telefonesAtuais)) {
            // Adicione o telefone se não estiver presente nos telefones atuais
            $stmt = $conn->prepare("INSERT INTO telefone (id_usuario, numero_telefone) VALUES (?, ?)");
            $stmt->bind_param("is", $id, $telefone);
            $stmt->execute();
        }
    }

    $response = array("success" => true);
    echo json_encode($response);
} else {
    $response = array("success" => false);
    echo json_encode($response);
}

$conn->close();
?>
