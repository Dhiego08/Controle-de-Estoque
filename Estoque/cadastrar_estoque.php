<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Controle_Estoque";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $data = json_decode(file_get_contents("php://input"), true);

    $data_entrada = date('Y-m-d', strtotime(str_replace('/', '-', $data['data_entrada']))); // Formata a data
    $data_entrada_br = date('d/m/Y', strtotime($data_entrada)); // Formatação para exibição

    $codi_produto = $data['codi_produto'];
    $produto = $data['produto'];
    $localizacao_estoque = $data['cnpj_fornecedor'];
    $qtd_entrada = $data['qtd_entrada']; 
    $qtd_saida = $data['qtd_saida'];
    $total_estoque = $data['total_estoque'];

    $sql = "INSERT INTO Estoque (data_entrada, codi_produto,  produto, localizacao_estoque, qtd_entrada, qtd_saida, total_estoque) 
            VALUES  ( '$data_entrada', '$codi_produto', '$produto', '$localizacao_estoque', '$qtd_entrada', '$qtd_saida', '$total_estoque')";

    // Após a execução do INSERT, adicione estas linhas
if (mysqli_query($con, $sql)) {
    $id = mysqli_insert_id($con);
    echo "<script>alert('Cadastro salvo com sucesso!'); window.location = 'Lista_Cadastro.php?id=$id';</script>";
} else {
    echo "Deu erro" . $sql . "<br>" . mysqli_error($con);
}

mysqli_close($con);
}
?>

