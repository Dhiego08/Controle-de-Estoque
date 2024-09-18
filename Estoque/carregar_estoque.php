<?php
$servername = "localhost";
$username = "root";
$password = "diego238563";
$dbname = "Controle_Estoque";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$sql = "SELECT * FROM Estoque"; 
$result = mysqli_query($conn, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $id_movimentacao = $row["id_movimentacao"];
        // Formatando a data de entrada para o padrão brasileiro (d/m/Y)
        $data_formatada = date('d/m/Y H:i:s', strtotime($row["data_entrada"]));
        
            echo'<tr>
                <td>' . $row["id_movimentacao"]     . '</td>
                <td>' . $data_formatada             . '</td>
                <td>' . $row["codi_produto"]        . '</td>
                <td>' . $row["produto"]             . '</td>
                <td>' . $row["localizacao_estoque"] . '</td>
                <td>' . $row["qtd_entrada"]         . '</td>
                <td>' . $row["qtd_saida"]           . '</td>
                <td>' . $row["total_estoque"]       . '</td>
                <td>
                    <img src="../Imagens/Editar.svg" class="editar" data-id="' . $row["id_movimentacao"] . '" title="Editar">
                    <img src="../Imagens/Delete.svg" class="excluir" data-id="' . $row["id_movimentacao"] . '" title="Excluir">
                </td>
            </tr>';
    }
} else {
    echo "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
}

mysqli_close($conn);
?>
