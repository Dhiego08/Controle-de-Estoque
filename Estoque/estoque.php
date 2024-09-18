<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FORNECEDORES - BackOffice</title>
</head>
<body>
    <table class="excel-table">
        <thead>
            <tr> 
                <th class="text_center" style="Width: 1%;">Id Movimentação</th>
                <th class="text-center" style="width: 10%;">Data de Entrada</th>
                <th class="text-center" style="width: 10%;">Código Produto</th>
                <th class="text-center" style="width: 25%;">Produto</th>
                <th class="text-center">Localização Estoque</th>
                <th class="text-center">Quantidade Entrada</th>
                <th class="text-center">Quantidade Saída</th>
                <th class="text-center">Total Estoque</th>
                <th class="text-center">Operações</th>
            </tr>
        </thead>
        <tbody id="EstoqueTableBody">
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "";
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


                    echo '<tr>
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
                echo "<tr><td colspan='8'>Nenhum resultado encontrado.</td></tr>";
            }

            mysqli_close($conn);
            ?>
        </tbody>
    </table>
</body>
</html>
