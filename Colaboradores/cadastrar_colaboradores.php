<?php
$servername = "localhost";
$username = "root";
$password = "diego238563";
$dbname = "Controle_Estoque";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome'];
$tipo = $data['tipo'];
$status = $data['status'];
$telefones = $data['telefones'];

if (!empty($nome) && !empty($tipo) && !empty($status) && count($telefones) > 0) {
    $sql = "INSERT INTO Usuario (nome_usuario, tipo_usuario, status_usuario) VALUES ('$nome', '$tipo', '$status')";
    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;

        foreach ($telefones as $telefone) {
            if (!empty($telefone)) {
                $sql_telefone = "INSERT INTO telefone (id_usuario, numero_telefone) VALUES ('$last_id', '$telefone')";
                if ($conn->query($sql_telefone) !== TRUE) {
                    echo json_encode(array("success" => false, "error" => $conn->error));
                    exit();
                }
            }
        }

        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "error" => $conn->error));
    }
} else {
    echo json_encode(array("success" => false, "error" => "Campos obrigatórios não preenchidos ou nenhum telefone válido inserido."));
}

$conn->close();

?>
