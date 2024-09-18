<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Colaboradores - BackOffice</title>
</head>
<body>
    <table class="excel-table">
                <thead>
                    <tr> 
                        <th class="text-center">Id</th>
                        <th class="text-center">Nome</th>
                        <th class="text-center">Usuário</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Operações</th>
                    </tr>
                </thead>
                <tbody id="colaboradoresTableBody">
                    <!-- Dados dos colaboradores serão preenchidos aqui -->
                    <?php
                    $servername = "localhost";
                    $username = "root";
                    $password = "diego238563";
                    $dbname = "Controle_Estoque";

                    $conn = mysqli_connect($servername, $username, $password, $dbname);

                    if (!$conn) {
                        die("Conexão falhou: " . mysqli_connect_error());
                    }

                    $sql = "SELECT * FROM Usuario"; // Substitua 'Usuario' pelo nome correto da sua tabela de colaboradores
                    $result = mysqli_query($conn, $sql);

                    if ($result) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo '<tr>
                                    <td>' . $row["id_usuario"] . '</td>
                                    <td>' . $row["nome_usuario"] . '</td>
                                    <td>' . $row["tipo_usuario"] . '</td>
                                    <td>' . $row["status_usuario"] . '</td>
                                    <td>
                                        <img src="../Imagens/Editar.svg" class="editar" data-id="' . $row["id_usuario"] . '" title="Editar">
                                        <img src="../Imagens/Delete.svg" class="excluir" data-id="' . $row["id_usuario"] . '" title="Excluir">
                                    </td>
                                </tr>';
                        }
                    } else {
                        echo "<tr><td colspan='5'>Nenhum resultado encontrado.</td></tr>";
                    }

                    mysqli_close($conn);
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    
        <!-- Seus scripts JavaScript aqui -->
        <script src="../../colabo.js"></script>
</body>
</html>
