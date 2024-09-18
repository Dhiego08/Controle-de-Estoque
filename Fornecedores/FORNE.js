

document.addEventListener("DOMContentLoaded", function() {
   const NovoFornecedor = document.getElementById("NovoFornecedor");

   if (NovoFornecedor) {
       const BtnAdd = document.getElementById("BtnAdd");

       if (BtnAdd) {
           BtnAdd.addEventListener("click", () => {
               NovoFornecedor.style.opacity = "1";
               NovoFornecedor.style.zIndex = "1";
               NovoFornecedor.classList.remove("OcultarPopup");
               document.getElementById("TituloPopup").innerHTML = "Novo Fornecedor";
               NovoFornecedor.classList.remove("OcultarPopup");

               const today = new Date().toLocaleDateString('pt-br');
               document.getElementById("Data").value = today;
               document.getElementById("CodiProduto").value = "";
               document.getElementById("Fornecedor").value = "";
               document.getElementById("Cnpj").value = "";
               document.getElementById("Telefone").value = "";
               document.getElementById("Produto").value = "";
               document.getElementById("EstiloProduto").value = "";
               
               // Adiciona o código de formatação de moeda para o campo "ValorNf"
               const valorNfInput = document.getElementById("ValorNf");
               valorNfInput.addEventListener("input", function () {
                   let valorFormatado = this.value.replace(/\D/g, "");
                   valorFormatado = parseFloat(valorFormatado / 100).toLocaleString("pt-BR", {
                       style: "currency",
                       currency: "BRL"
                   });
                   this.value = valorFormatado;
               });

               document.getElementById("ValorNf").value = "";
               document.getElementById("Qtd").value = "";
           });
       }

       const BtnFecharPopup = document.getElementById("BtnFecharPopup");
       const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
       const BtnCancelarPopup = document.getElementById("BtnCancelarPopup");

       if (BtnFecharPopup && BtnSalvarPopup && BtnCancelarPopup) {
           BtnFecharPopup.addEventListener("click", fecharPopup);
           BtnSalvarPopup.addEventListener("click", salvarFornecedor);
           BtnCancelarPopup.addEventListener("click", fecharPopup);
       }
   }

});



  
// Esta função fecha a janela de popup para adicionar um novo fornecedor
function fecharPopup() {
  // Obtém o elemento HTML com o ID "NovoFornecedor"
  const NovoFornecedor = document.getElementById("NovoFornecedor");

// Verifica se o elemento NovoFornecedor existe
  if (NovoFornecedor) {
      // Configura o estilo do elemento para torná-lo invisível
      NovoFornecedor.style.opacity = "0"; // Define a opacidade como 0 para torná-lo invisível
      NovoFornecedor.style.zIndex = "-1"; // Define o índice z como -1 para ocultar o elemento atrás de outros elementos
      NovoFornecedor.classList.add("OcultarPopup"); // Adiciona a classe CSS "OcultarPopup" para ocultar o elemento
  }
}

// função PARA SALVAR os detalhes do fornecedor no banco de dados
function salvarFornecedor() {
  const Data = document.getElementById("Data").value;
  const CodiProduto = document.getElementById("CodiProduto").value;
  const Fornecedor = document.getElementById("Fornecedor").value;
  const Cnpj = document.getElementById("Cnpj").value;
  const Telefone = document.getElementById("Telefone").value;
  const Produto = document.getElementById("Produto").value;
  const EstiloProduto = document.getElementById("EstiloProduto").value;
  const ValorNf = document.getElementById("ValorNf").value;
  const Qtd = document.getElementById("Qtd").value;
 
  

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (Data !== '' && CodiProduto !== '' && Fornecedor !== '' && Cnpj !== '' && Telefone !== '' && Produto !== '' && EstiloProduto !=='' 
       && ValorNf !== ''  && Qtd !== '' ) {
      // Cria um objeto 'dados' com os detalhes do fornecedor
      const dados = {
          data_entrada: Data,
          codi_produto: CodiProduto,
          descricao_fornecedor: Fornecedor,
          cnpj_fornecedor: Cnpj,
          Telefone_fornecedor: Telefone,
          descricao_produto: Produto,
          estilo_produto: EstiloProduto,
          valor_nf: ValorNf,
          qtd_entrada: Qtd,
       };

      fetch('cadastrar_fornecedores.php', {
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
           atualizarTabelaFornecedores();
       
          } else {
              if (data.code === 1) {
                  alert('Código ou produto incompatíveis na tabela Fornecedores. Favor preencher corretamente.');
              } else if (data.code === 2) {
                  alert('Código de produto já cadastrado com outro produto. Favor preencher corretamente.');
              } else {
                  alert('Código ou produto incompatíveis. Favor preencher corretamente.');
              }
          }
      });
  } else {
      alert('Existem campos vazios, preencha todos os campos corretamente.');
  }
}


// Esta função atualiza a tabela de fornecedores na página HTML
function atualizarTabelaFornecedores() {
  // Faz uma requisição fetch para obter os dados dos fornecedores do arquivo fornecedores.php
  fetch('fornecedores.php')
      .then(response => response.text()) // Converte a resposta do servidor para texto
      .then(data => {
          // Insere os dados obtidos na div com ID 'dadosFornecedores' na página HTML
          document.getElementById('dadosFornecedores').innerHTML = data;
      })
}

/*************************************************************************************************************************************/
function adicionarEventosEditar() {
  const iconesEditar = document.querySelectorAll('.editar');
  const NovoFornecedor = document.getElementById("NovoFornecedor");

  iconesEditar.forEach(icone => {
      icone.addEventListener('click', function () {
          if (confirm('Deseja realmente editar os dados?')) {
              const idProduto = icone.getAttribute('data-id');
              const dataentrada = icone.parentElement.parentElement.querySelector('td:nth-child(2)').textContent.trim();
              const codiproduto = icone.parentElement.parentElement.querySelector('td:nth-child(3)').textContent.trim();
              const descricaofornecedor = icone.parentElement.parentElement.querySelector('td:nth-child(4)').textContent.trim();
              const cnpjfornecedor = icone.parentElement.parentElement.querySelector('td:nth-child(5)').textContent.trim();
              const Telefonefornecedor = icone.parentElement.parentElement.querySelector('td:nth-child(6)').textContent.trim();
              const descricaoproduto = icone.parentElement.parentElement.querySelector('td:nth-child(7)').textContent.trim();
              const estiloproduto = icone.parentElement.parentElement.querySelector('td:nth-child(8)').textContent.trim();
              const valornf = icone.parentElement.parentElement.querySelector('td:nth-child(9)').textContent.trim();
              const qtdentrada = icone.parentElement.parentElement.querySelector('td:nth-child(10)').textContent.trim();
              


              document.getElementById("Data").value = dataentrada;
              document.getElementById("CodiProduto").value = codiproduto;
              document.getElementById("Fornecedor").value = descricaofornecedor;
              document.getElementById("Cnpj").value = cnpjfornecedor;
              document.getElementById("Telefone").value = Telefonefornecedor;
              document.getElementById("Produto").value = descricaoproduto;
              document.getElementById("EstiloProduto").value = estiloproduto;
              document.getElementById("ValorNf").value = valornf;
              document.getElementById("Qtd").value = qtdentrada;
             

              NovoFornecedor.style.opacity = "1";
              NovoFornecedor.style.zIndex = "1";
              NovoFornecedor.classList.remove("OcultarPopup");
              document.getElementById("TituloPopup").innerHTML = "Editar Fornecedor";

              const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
              // Adicionando o idProduto como um atributo data-
              document.getElementById("Produto").setAttribute('data-idProduto', idProduto);

              BtnSalvarPopup.removeEventListener("click", salvarFornecedor);
              BtnSalvarPopup.addEventListener("click", function () {
                  editarFornecedor(idProduto);
              });
          }
      });
  });
}

function editarFornecedor(idProduto) {
  const NovoFornecedor = document.getElementById("NovoFornecedor");
  if (NovoFornecedor) {
      NovoFornecedor.style.opacity = "1";
      NovoFornecedor.style.zIndex = "1";
      NovoFornecedor.classList.remove("OcultarPopup");

      const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
      BtnSalvarPopup.addEventListener("click", function () {
          atualizarFornecedor(idProduto);
      });
  }
}

function atualizarFornecedor(idProduto) {
  // Obter valores atualizados dos campos do formulário
  
  const dataentrada = document.getElementById("Data").value;
  const codiproduto = document.getElementById("CodiProduto").value
  const descricaofornecedor = document.getElementById("Fornecedor").value;
  const cnpjfornecedor = document.getElementById("Cnpj").value;
  const Telefonefornecedor = document.getElementById("Telefone").value;
  const descricaoproduto = document.getElementById("Produto").value;
  const estiloproduto = document.getElementById("EstiloProduto").value;
  const valornf = document.getElementById("ValorNf").value;
  const qtdentrada = document.getElementById("Qtd").value;
  

  const dados = {
      id_Produto: idProduto,
      data_entrada: dataentrada,
      codi_produto: codiproduto,
      descricao_fornecedor: descricaofornecedor,
      cnpj_fornecedor: cnpjfornecedor,
      Telefone_fornecedor: Telefonefornecedor,
      descricao_produto: descricaoproduto,
      estilo_produto: estiloproduto,
      valor_nf: valornf,
      qtd_entrada: qtdentrada,
      
  };

  fetch('editar_fornecedor.php', {
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
              atualizarTabelaFornecedores(); // Atualiza a tabela após a edição bem-sucedida
          }
      }
  });
}


// Função para carregar os colaboradores na tabela
function carregarFornecedores() {
  fetch('carregar_fornecedores.php')
      .then(response => response.text())
      .then(data => {
          document.getElementById('FornecedoresTableBody').innerHTML = data;
          adicionarEventosEditar();
          adicionarEventosExcluir();
      })
  }
// Chamada inicial para carregar os colaboradores na tabela
carregarFornecedores();


/***********************************************************************************************************************************************/
// Função para adicionar eventos de excluir aos ícones
function adicionarEventosExcluir() {
  const iconesExcluir = document.querySelectorAll('.excluir');
  iconesExcluir.forEach(icone => {
      icone.addEventListener('click', function() {
          if (confirm('Deseja realmente excluir o cadastro?')) {
              const idProduto = icone.getAttribute('data-id');
              // Código para excluir o colaborador com o ID especificado
              // Utilize uma requisição fetch ou outra forma de comunicação com o servidor para deletar o colaborador
              fetch(`excluir_fornecedor.php?id=${idProduto}`, {
                  method: 'DELETE'
              })
              .then(response => response.json())
              .then(data => {
                  if (data.success) {
                      // Recarregar a tabela após a exclusão
                      carregarFornecedores();
                      alert('Fornecedor excluído com sucesso!');
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
  fetch('fornecedores.php')
      .then(response => response.text())
      .then(data => {
          const dadosFornecedores = document.getElementById('dadosFornecedores');
          if (dadosFornecedores) {
              dadosFornecedores.innerHTML = data;
          }
  })
}

document.addEventListener("DOMContentLoaded", function() {
  const F_Filtragem = document.querySelector("#F_Filtragem");

  F_Filtragem.addEventListener("input", (evt) => {
      const termoFiltro = evt.target.value.toUpperCase();
      const Linhas = document.querySelectorAll("#FornecedoresTableBody tr");

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

