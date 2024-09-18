<!DOCTYPE html>
<html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>MOVIMENTAÇÃO- BackOffice</title>
            
            
            <link rel="stylesheet" type="text/css" href="../Fornecedores/cadastrar_fornecedores.php">
            <link rel="stylesheet" type="text/css" href="../Fornecedores/carregar_fornecedores.php">
            <link rel="stylesheet" type="text/css" href="../Fornecedores/editar_fornecedor.php">
        </head>
    <body>
        <table class="excel-table" id="movimentacaoTable">
            <thead>
                <tr> 
                    <th class="text-center" style="width: 1%;">Id Movimentação</th>
                    <th class="text-center" style="width: 1%;">Data de Movimentação</th>
                    <th class="text-center" style="width: 1%;">Código Produto</th>
                    <th class="text-center">Produto</th>
                    <th class="text-center">Estilo Produto</th>
                    <th class="text-center" style="width: 6%;" >Custo compra</th>
                    <th class="text-center" style="width: 6%;" >Preço de Compra</th>
                    <th class="text-center">Preço de Venda</th>
                    <th class="text-center">Tipo Saida</th>
                    <th class="text-center">Valor do Lucro</th>
                    <th class="text-center" style="width: 28%;" >Operações</th>
                </tr>
            </thead>
            <tbody id="MovimentacaoTableBody">
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "Controle_Estoque";

            $conn = mysqli_connect($servername, $username, $password, $dbname);

            if (!$conn) {
                die("Conexão falhou: " . mysqli_connect_error());
            }

            $sql = "SELECT * FROM Movimentacao"; 
            $result = mysqli_query($conn, $sql);

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $id_movimentacao = $row["id_movimentacao"];
                    # FORMATANDO DATA E HORA NO PADRÃO BRASILEIRO.

                    # FORMATANDO OS VALORES NA MOEDA BRASILEIRA.
                    $data_formatada = date('d/m/Y H:i:s', strtotime($row["data_entrada"]));
                    $custocompra = 'R$' . number_format(floatval($row["custo_compra"]), 2, ',', '.');
                    $precocompra = 'R$' . number_format(floatval($row["preco_compra"]), 2, ',', '.');
                    $precovenda = 'R$' . number_format(floatval($row["preco_venda"]), 2, ',', '.');
                    $precolucro = 'R$' . number_format(floatval($row["preco_lucro"]), 2, ',', '.');
                
                    echo '<tr>
                            <td>' . $row["id_movimentacao"] . '</td>
                            <td>' . $data_formatada         . '</td>
                            <td>' . $row["codi_produto"]    . '</td>
                            <td>' . $row["produto"]         . '</td>
                            <td>' . $row["estilo_produto"]  . '</td>
                            <td>' . $custocompra            . '</td>
                            <td>' . $precocompra            . '</td>
                            <td>' . $precovenda             . '</td>
                            <td>' . $row["tipo_saida"]      . '</td>
                            <td>' . $precolucro             . '</td>
                            <td>

                            <div class="icon-container">
                                <div class="icon-wrapper">
                                    <img src="../Imagens/Editar.svg" class="editar" data-id="' .$row["id_movimentacao"].'" title="Editar">
                                    <p class="icon-labelEditar">Editar Movimentação</p>
                                </div>

                                <div class="icon-wrapper">
                                    <img src="../Imagens/Delete.svg" class="excluir" data-id="' . $row["id_movimentacao"] . '" title="Excluir">
                                    <p class="icon-labelExcluir">Excluir Movimentação</p>
                                </div>

                                <div class="icon-wrapper">
                                    <img src="../Imagens/AddVendas.svg" class="addVendas" data-id="'. $row["id_movimentacao"].'" title="Adicionar Venda">
                                    <p class="icon-labelVenda">Adicionar Venda</p>
                                </div>
                            </div>
                        </td>
                    </tr>';
                    }
                } else {
                    echo "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                }

                mysqli_close($conn);
            ?>
            </tbody>
        </table>
    </body>
</html>
