<?php
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Controle_Estoque";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    // Utilizando prepared statement para evitar SQL Injection
    $sql = "DELETE FROM Estoque WHERE id_movimentacao = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id); // "s" para indicar uma string

    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Estoque excluído com sucesso!"));
    } else {
        echo json_encode(array("success" => false, "message" => "Erro ao excluir fornecedor: " . $conn->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array("success" => false, "message" => "ID do fornecedor não fornecido."));
}
?>
