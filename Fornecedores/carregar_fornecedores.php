<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Controle_Estoque";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$sql = "SELECT * FROM Fornecedores"; 
$result = mysqli_query($conn, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $id_produto = $row["id_produto"];
        // Formatando a data de entrada para o padrão brasileiro (d/m/Y)
        $data_formatada = date('d/m/Y H:i:s', strtotime($row["data_entrada"]));

        $valornf = 'R$' . number_format(floatval($row["valor_nf"]), 2, ',', '.'); // Formatando o valor para exibição

                    echo '<tr>
                            <td>' . $row["id_produto"]          . '</td>
                            <td>' . $data_formatada             . '</td>
                            <td>' . $row["codi_produto"]        . '</td>
                            <td>' . $row["descricao_fornecedor"]. '</td>
                            <td>' . $row["cnpj_fornecedor"]     . '</td>
                            <td>' . $row["Telefone_fornecedor"] . '</td>
                            <td>' . $row["descricao_produto"]   . '</td>
                            <td>' . $row["estilo_produto"]      . '</td>
                            <td>' . $valornf                    . '</td> 
                            <td>' . $row["qtd_entrada"]         . '</td>
                            <td>
                                <img src="../Imagens/Editar.svg" class="editar" data-id="' . $row["id_produto"] . '" title="Editar">
                                <img src="../Imagens/Delete.svg" class="excluir" data-id="' . $row["id_produto"] . '" title="Excluir">
                            </td>
                        </tr>';
        }
        } else {
            echo "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
        }

            mysqli_close($conn);
?>
