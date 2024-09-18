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

    // Excluir os telefones relacionados ao usuário
    $deletePhones = "DELETE FROM telefone WHERE id_usuario = $id";
    $resultPhones = $conn->query($deletePhones);

    // Agora podemos excluir o usuário
    $sql = "DELETE FROM Usuario WHERE id_usuario = $id";
    $result = $conn->query($sql);

    if ($result === TRUE) {
        echo json_encode(array("success" => true, "message" => "Colaborador excluído com sucesso!"));
    } else {
        echo json_encode(array("success" => false, "message" => "Erro ao excluir colaborador: " . $conn->error));
    }

    $conn->close();
} else {
    echo json_encode(array("success" => false, "message" => "ID do colaborador não fornecido."));
}
?>
