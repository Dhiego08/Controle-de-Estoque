<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FORNECEDORES - BackOffice</title>
    
    <link rel="stylesheet" type="text/css" href="../Fornecedores/fornecedores.php">
    <link rel="stylesheet" type="text/css" href="../Fornecedores/cadastrar_fornecedores.php">
    <link rel="stylesheet" type="text/css" href="../Fornecedores/carregar_fornecedores.php">
    <link rel="stylesheet" type="text/css" href="../Fornecedores/editar_fornecedor.php">

    
</head>
<body>
    <table class="excel-table">
        <thead>
            <tr> 
                <th class="text-center" style="width: 1%;">Id Movimentação</th>
                <th class="text-center" style="width: 8%;">Data de Entrada</th>
                <th class="text-center" style="width: 1%;">Código Produto</th>
                <th class="text-center">Descrição Fornecedor</th>
                <th class="text-center">Cnpj Fornecedor</th>
                <th class="text-center">Telefone Fornecedor</th>
                <th class="text-center">Descrição Produto</th>
                <th class="text-center">Estilo Produto</th>
                <th class="text-center" style="width: 8%;">Valor NF</th>
                <th class="text-center" style="width: 10%;">Quantidade de Entrada</th>
                <th class="text-center">Operações</th>
            </tr>
        </thead>
        <tbody id="FornecedoresTableBody">
        
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "diego238563";
            $dbname = "Controle_Estoque";

            $conn = mysqli_connect($servername, $username, $password, $dbname);

            if (!$conn) {
                die("Conexão falhou: " . mysqli_connect_error());
            }

            $sql = "SELECT * FROM Fornecedores"; 
            $result = mysqli_query($conn, $sql);

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    
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
                            <td>' . $valornf            . '</td>
                            <td>' . $row["qtd_entrada"]         . '</td>
                            <td>
                                <img src="../Imagens/Editar.svg" class="editar" data-id="' . $row["id_produto"] . '" title="Editar">
                                <img src="../Imagens/Delete.svg" class="excluir" data-id="' . $row["id_produto"] . '" title="Excluir">
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
