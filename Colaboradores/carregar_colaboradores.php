<?php
$servername = "localhost";
$username = "root";
$password = "diego238563";
$dbname = "Controle_Estoque";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$sql = "SELECT * FROM Usuario";
$result = mysqli_query($conn, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $idUsuario = $row["id_usuario"];
        $sqlTelefones = "SELECT * FROM telefone WHERE id_usuario = $idUsuario";
        $resultTelefones = mysqli_query($conn, $sqlTelefones);

        $telefones = [];
        while ($rowTelefone = mysqli_fetch_assoc($resultTelefones)) {
            $telefones[] = $rowTelefone['numero_telefone'];
        }

        echo '<tr>
            <td>' . $row["id_usuario"] . '</td>
            <td>' . $row["nome_usuario"] . '</td>
            <td>' . $row["tipo_usuario"] . '</td>
            <td>' . $row["status_usuario"] . '</td>
            <td>
            <img src="../Imagens/Editar.svg" class="editar" data-id="' . $row["id_usuario"] . '" data-telefones="' . implode(",", $telefones) . '" title="Editar">
            <img src="../Imagens/Delete.svg" class="excluir" data-id="' . $row["id_usuario"] . '" title="Excluir">
            </td>
        </tr>';
    }
} else {
    echo "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
}

mysqli_close($conn);
?>
