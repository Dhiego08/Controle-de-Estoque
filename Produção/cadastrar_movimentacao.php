<?php
   if ($_SERVER["REQUEST_METHOD"]== "POST"){
      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "Controle_Estoque";

      $conn = new mysqli($servername, $username, $password, $dbname);

      if ($conn-> connect_error){
         $response = array("success" => false, "message" => "conexão falhou:" . $conn->connect_error);
      }else {
         $data = json_decode(file_get_contents("php://input"),true);

/********************************************************************************************************************************************************************************************************************/
      $verificarVR = ['custo_compra', 'preco_compra', 'preco_venda', 'preco_lucro'];
      foreach ($verificarVR as $valor) {
         if (!preg_match('/^(?:R\$?s*)?\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/',$data[$valor])) {
            $response  = array("sucess" => false, "message" => "Por favor, digite os valores numéricos corretamente, respeitando as casas decimais.");
            echo json_encode($response);
            return;
            
         }
         
      }


#CRIANDO O CADASTRO NA TABELA MOVIMENTAÇÃO E, FAZENDO 
         date_default_timezone_set('America/São Paulo'); # DEFINE O FUSO HORÁRIO PARA O BRASIL
         $data_entrada = date('y-m-d h:i:s'); # OBTÉM A DATA E HORA ATUAL DO SERVIDOR NO FUSO HORÁRIO DO BRASIL
         $codi_produto = $data['codi_produto'];
         $produto = $data['produto'];
         $estilo_produto = $data['estilo_produto'];
         $custo_compra = isset($data['custo_compra']) ? str_replace(['R$', '.', ',',], ['', '', '.'], $data['custo_compra']): null;
         $preco_compra = isset($data['preco_compra']) ? str_replace(['R$', '.', ',',], ['', '','.'], $data['preco_compra']): null;
         $preco_venda = isset($data['preco_venda']) ? str_replace(['R$', '.', '.',], ['','','.',], $data['preco_venda']): null;
         $tipo_saida = $data['tipo_saida'];
         $preco_lucro = isset($data['preco_lucro']) ? str_replace(['R$', '.', '.',], ['', '', '.',], $data['preco_lucro']): null;
      
      }
   }  
   
