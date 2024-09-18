<?php
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $servername = "localhost";
    $username = "root";
    $password = "diego238563";
    $dbname = "Controle_Estoque";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    // Agora podemos excluir o usuário
    $sql = "DELETE FROM Fornecedores WHERE id_produto = $id";
    $result = $conn->query($sql);

    if ($result === TRUE) {
        echo json_encode(array("success" => true, "message" => "Fornecedor excluído com sucesso!"));
    } else {
        echo json_encode(array("success" => false, "message" => "Erro ao excluir fornecedor: " . $conn->error));
    }

    $conn->close();
} else {
    echo json_encode(array("success" => false, "message" => "ID do fornecedor não fornecido."));
}
?>