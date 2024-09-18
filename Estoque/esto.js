// CRIANDO DOMContentLoaded PARA ACIONAR A ESTRTURA DO HTML E CAREGAR A PÁGINA COMPLETAMENTE PELO NAVEGADOR
document.addEventListener("DOMContentLoaded", function() {
   const NovoEstoque = document.getElementById("NovoEstoque");
   

// verifica se a variável NovoFornecedor é avaliada como verdadeira. Se NovoFornecedor for uma variável 
// que já foi declarada e possui um valor atribuído, a condição será avaliada.
   if (NovoEstoque) {
       const BtnAdd = document.getElementById("BtnAdd");
        if (BtnAdd) {
// Verifica se a variável BtnAdd existe e é válida
   BtnAdd.addEventListener("click", () => {
// Adiciona um evento de clique ao elemento BtnAdd

// Torna o elemento NovoFornecedor visível ao ajustar a opacidade para 1
       NovoEstoque.style.opacity = "1";

// Define a ordem de empilhamento do elemento NovoFornecedor como 1
       NovoEstoque.style.zIndex = "1";

// Remove a classe CSS "OcultarPopup" do elemento NovoFornecedor, tornando-o visível
       NovoEstoque.classList.remove("OcultarPopup");

// Define o conteúdo HTML do elemento com ID "TituloPopup" como "Novo Fornecedor"
       document.getElementById("TituloPopup").innerHTML = "Novo Estoque";

// Remove novamente a classe CSS "OcultarPopup" do elemento NovoFornecedor
       NovoEstoque.classList.remove("OcultarPopup");

// OBTÉM A DATA ATUAL E O HORÁRIO NO FORMATO BRASILEIRO
        const now = new Date().toLocaleString('pt-br');
      
// Define o valor do campo de formulário com ID "Data" como a data E HORÁRIO atual.
      document.getElementById("DataEntrada").value = now;    

// Limpa os valores dos campos de formulário com IDs específicos
       document.getElementById("CodigoProduto").value = "";
       document.getElementById("NovoProduto").value = "";
       document.getElementById("Estoque").value = "";
       document.getElementById("QtdEntrada").value = "";
       document.getElementById("QtdSaida").value = "";
       document.getElementById("TotalEstoque").value = "";
   });
}
// Obtém referências para os elementos do DOM com IDs "BtnFecharPopup", "BtnSalvarPopup" e "BtnCancelarPopup"
       const BtnFecharPopup = document.getElementById("BtnFecharPopup");
       const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
       const BtnCancelarPopup = document.getElementById("BtnCancelarPopup");

       if (BtnFecharPopup && BtnSalvarPopup && BtnCancelarPopup) {
           BtnFecharPopup.addEventListener("click", fecharPopup);
           BtnSalvarPopup.addEventListener("click", salvarEstoque);
           BtnCancelarPopup.addEventListener("click", fecharPopup);
       }
   }
      
});
   
// Esta função fecha a janela de popup para adicionar um novo fornecedor
function fecharPopup() {
   // Obtém o elemento HTML com o ID "NovoFornecedor"
   const NovoEstoque = document.getElementById("NovoEstoque");

// Verifica se o elemento NovoFornecedor existe
   if (NovoEstoque) {
       // Configura o estilo do elemento para torná-lo invisível
       NovoEstoque.style.opacity = "0"; // Define a opacidade como 0 para torná-lo invisível
       NovoEstoque.style.zIndex = "-1"; // Define o índice z como -1 para ocultar o elemento atrás de outros elementos
       NovoEstoque.classList.add("OcultarPopup"); // Adiciona a classe CSS "OcultarPopup" para ocultar o elemento
   }
}
//  função PARA SALVAR os detalhes do fornecedor no banco de dados
function salvarEstoque() {
   const DataEntrada = document.getElementById("DataEntrada").value;
   const CodiProduto = document.getElementById("CodigoProduto").value;
   const NovoProduto = document.getElementById("NovoProduto").value;
   const Estoque = document.getElementById("Estoque").value;
   const QtdEntrada = document.getElementById("QtdEntrada").value;
   const QtdSaida = document.getElementById("QtdSaida").value;
   const TotalEstoque = document.getElementById("TotalEstoque").value;

// Verifica se todos os campos obrigatórios foram preenchidos
   if (CodiProduto !== ''  && DataEntrada !==  '' && NovoProduto !== '' && Estoque !== '' && QtdEntrada !=='' && QtdSaida !== '' && TotalEstoque !== '') {
// Cria um objeto 'dados' com os detalhes do fornecedor
       const dados = {
           data_entrada: DataEntrada,
           codi_produto: CodiProduto,
           produto: NovoProduto,
           localizacao_estoque: Estoque,
           qtd_entrada: QtdEntrada,
           qtd_saida: QtdSaida,
           total_estoque: TotalEstoque,
           
       };

// Envia os dados para o arquivo cadastrar_fornecedores.php usando o método POST
       fetch('cadastrar_estoque.php', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(dados)
       })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               alert('Cadastro feito com sucesso!');
               fecharPopup();
               atualizarTabelaEstoque(); // Chama a função para atualizar a tabela após o cadastro bem-sucedido
           }
       })
    
       }
   }

   // Função para carregar o ESTOQUE na tabela
function carregarEstoque() {
    fetch('carregar_estoque.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('EstoqueTableBody').innerHTML = data;
            adicionarEventosEditar();
            adicionarEventosExcluir();
            fecharPopup();
        })
    }
    
 // Chamada inicial para carregar o ESTOQUE na tabela.
        carregarEstoque();
 

// Esta função atualiza a tabela de ESTOQUE na página HTML.
function atualizarTabelaEstoque() {
   // Faz uma requisição fetch para obter os dados dos fornecedores do arquivo fornecedores.php
   fetch('estoque.php')
       .then(response => response.text()) // Converte a resposta do servidor para texto
       .then(data => {
           // Insere os dados obtidos na div com ID 'dadosFornecedores' na página HTML
           document.getElementById('dadosEstoque').innerHTML = data;
           
           fecharPopup();
       })
   }
        atualizarTabelaEstoque();

/*************************************************************************************************************************************/
function adicionarEventosEditar() {
   const iconesEditar = document.querySelectorAll('.editar');
   const NovoEstoque = document.getElementById("NovoEstoque");

   iconesEditar.forEach(icone => {
       icone.addEventListener('click', function () {
           if (confirm('Deseja realmente editar os dados?')) {
               const idProduto = icone.getAttribute('data-id');
               const dataentrada = icone.parentElement.parentElement.querySelector('td:nth-child(2)').textContent.trim();
               const codiproduto = icone.parentElement.parentElement.querySelector('td:nth-child(3)').textContent.trim();
               const produto = icone.parentElement.parentElement.querySelector('td:nth-child(4)').textContent.trim();
               const localizacaoestoque = icone.parentElement.parentElement.querySelector('td:nth-child(5)').textContent.trim();
               const qtdentrada = icone.parentElement.parentElement.querySelector('td:nth-child(6)').textContent.trim();
               const qtdsaida = icone.parentElement.parentElement.querySelector('td:nth-child(7)').textContent.trim();
               const totalestoque = icone.parentElement.parentElement.querySelector('td:nth-child(8)').textContent.trim();
               

               
               document.getElementById("DataEntrada").value = dataentrada;
               document.getElementById("CodigoProduto").value = codiproduto;
               document.getElementById("NovoProduto").value = produto;
               document.getElementById("Estoque").value = localizacaoestoque;
               document.getElementById("QtdEntrada").value = qtdentrada;
               document.getElementById("QtdSaida").value = qtdsaida;
               document.getElementById("TotalEstoque").value = totalestoque;
               

               NovoEstoque.style.opacity = "1";
               NovoEstoque.style.zIndex = "1";
               NovoEstoque.classList.remove("OcultarPopup");
               document.getElementById("TituloPopup").innerHTML = "Editar Estoque";

               const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
               // Adicionando o idProduto como um atributo data-
               document.getElementById("NovoProduto").setAttribute('data-idProduto', idProduto);

               BtnSalvarPopup.removeEventListener("click", salvarEstoque);
               BtnSalvarPopup.addEventListener("click", function () {
                   atualizarEstoque(idProduto);
               });
           }
       });
   });
}

function editarEstoque(idProduto) {
   const NovoEstoque = document.getElementById("NovoEstoque");
   if (NovoEstoque) {
       NovoEstoque.style.opacity = "1";
       NovoEstoque.style.zIndex = "1";
       NovoEstoque.classList.remove("OcultarPopup");

       const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
       BtnSalvarPopup.addEventListener("click", function () {
           atualizarEstoque(idProduto);
       });
   }
}

function atualizarEstoque(idProduto) {
   // Obter valores atualizados dos campos do formulário
   
   const dataentrada = document.getElementById("DataEntrada").value;
   const codiproduto= document.getElementById("CodigoProduto").value;
   const produto = document.getElementById("NovoProduto").value;
   const localizacaoestoque = document.getElementById("Estoque").value;
   const qtdentrada = document.getElementById("QtdEntrada").value;
   const qtdsaida = document.getElementById("QtdSaida").value;
   const totalestoque = document.getElementById("TotalEstoque").value;
   
   const dados = {
       id_movimentacao: idProduto,
       data_entrada: dataentrada,
       codi_produto: codiproduto,
       produto: produto,
       localizacao_estoque: localizacaoestoque,
       qtd_entrada: qtdentrada,
       qtd_saida: qtdsaida,
       total_estoque: totalestoque,
       
   };

   fetch('editar_estoque.php', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(dados)
   })
   .then(response => response.json())
   .then(data => {
       if (data.success) {
           if (data.action === "update") {
               alert('Dados atualizados com sucesso!');
               fecharPopup();
               atualizarTabelaEstoque(); // Atualiza a tabela após a edição bem-sucedida
           }
       }
   });
}


// Função para carregar os colaboradores na tabela
function carregarEstoque() {
   fetch('carregar_estoque.php')
       .then(response => response.text())
       .then(data => {
           document.getElementById('EstoqueTableBody').innerHTML = data;
           adicionarEventosEditar();
           adicionarEventosExcluir();
           fecharPopup();
       })
   }
// Chamada inicial para carregar os colaboradores na tabela
        carregarEstoque();

// Esta função atualiza a tabela de ESTOQUE na página HTML.
function atualizarTabelaEstoque() {
    // Faz uma requisição fetch para obter os dados dos fornecedores do arquivo fornecedores.php
    fetch('estoque.php')
        .then(response => response.text()) // Converte a resposta do servidor para texto
        .then(data => {
            // Insere os dados obtidos na div com ID 'dadosFornecedores' na página HTML
            document.getElementById('dadosEstoque').innerHTML = data;
            adicionarEventosEditar();
            adicionarEventosExcluir();
            fecharPopup();
        })
    }
        atualizarTabelaEstoque(); 

/***********************************************************************************************************************************************/
// Função para adicionar eventos de excluir aos ícones
function adicionarEventosExcluir() {
   const iconesExcluir = document.querySelectorAll('.excluir');
   iconesExcluir.forEach(icone => {
       icone.addEventListener('click', function() {
           if (confirm('Deseja realmente excluir o cadastro?')) {
               const CodiProduto = icone.getAttribute('data-id');
               // Código para excluir o colaborador com o ID especificado
               // Utilize uma requisição fetch ou outra forma de comunicação com o servidor para deletar o colaborador
               fetch(`excluir_estoque.php?id=${CodiProduto}`, {
                   method: 'DELETE'
               })
               .then(response => response.json())
               .then(data => {
                   if (data.success) {
                       // Recarregar a tabela após a exclusão
                       carregarEstoque();
                       alert('Estoque excluído com sucesso!');
                   } else {
                       alert('Erro ao excluir o colaborador!');
                   }
               })
               
           }
       });
   });
}

/********************************************************************************************************************************/
function fetchFornecedores() {
   fetch('estoque.php')
       .then(response => response.text())
       .then(data => {
           const dadosFornecedores = document.getElementById('dadosEtoque');
           if (dadosFornecedores) {
               dadosFornecedores.innerHTML = data;
           }
   })
}

document.addEventListener("DOMContentLoaded", function() {
   const F_Filtragem = document.querySelector("#F_Filtragem");

   F_Filtragem.addEventListener("input", (evt) => {
       const termoFiltro = evt.target.value.toUpperCase();
       const Linhas = document.querySelectorAll("#EstoqueTableBody tr");

       Linhas.forEach((linha) => {
           let encontrou = false;
           const Colunas = linha.getElementsByTagName("td");

           for (let i = 0; i < Colunas.length; i++) {
               const textoColuna = Colunas[i].textContent.toUpperCase();
               if (textoColuna.indexOf(termoFiltro) > -1) {
                   encontrou = true;
                   break;
               }
           }

           linha.style.display = encontrou ? "" : "none";
       });
   });
});






   




