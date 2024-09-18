//CRIANDO O DOMCONTENTLOADED PARA ACIONAR A ESTRUTURA DO HTML E, CARREGAR A PÁGINA COMPLETAMENTE PELO NAVEGADOR
document.addEventListener("DOMContentLoaded", function() {
   const NovaMovimentacao = document.getElementById("NovaMovimentacao");

// VERIFICA SE A VARIÁVEL NovaMovimentacao É AVALIADA COMO VERDADEIRA. SE NovaMovimentacao FOR UMA VARIAVEL
// QUE JÁ FOI DECLARADA E POSSUI UM VALOR ATRIBUIDO, A CONDIÇÃO SERÁ AVALIADA.
if(NovaMovimentacao){
   const BtnAdd = document.getElementById("BtnAdd");
   if (BtnAdd) {
// VERIFICA SE A VARIÁVEL BtnAdd EXISTE E, É VÁLIDA.
       BtnAdd.addEventListener("click",() => {
           NovaMovimentacao.style.opacity = "1";
           NovaMovimentacao.style.zIndex = "1";
           NovaMovimentacao.classList.remove("OcultarPopup");
           document.getElementById("TituloPopup").innerHTML = "Nova Movimentacao";
           NovaMovimentacao.classList.remove("OcultarPopup");

// OBTÉM A DATA ATUAL E O HORÁRIO NO FORMATO BRASILEIRO
            const now = new Date().toLocaleString('pt-br');
            document.getElementById("Data").value = now;

// LIMPA OS VALORES DOS CAMPOS DE FORMULÁRIOS COM IDS ESPECIFICO
           document.getElementById("CodiProduto").value = "";
           document.getElementById("Produto").value = "";
           document.getElementById("EstiloProduto").value = "";
           document.getElementById("CustoCompra").value = "";
           document.getElementById("PrecoCompra").value = "";
           document.getElementById("PrecoVenda").value = "";
           document.getElementById("TipoSaida").value = "";
           document.getElementById("ValorLucro").value = "";
           });
       }
   }
});


// OBTÉM REFERÊNCIA PARA OS ELEMENTOS DO DOM COM IDs "BtnFecharPoup", "BtnSalvarPoup" E "BtnCancelaPoup".
   const BtnFecharPopup = document.getElementById("BtnFecharPopup");
   const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
   const BtnCancelarPopup = document.getElementById("BtnCancelarPopup");

   if (BtnFecharPopup && BtnSalvarPopup && BtnCancelarPopup) {
       BtnFecharPopup.addEventListener("click", fecharPopup);
       BtnSalvarPopup.addEventListener("click", salvarMovimentacao);
       BtnCancelarPopup.addEventListener("click", fecharPopup);
       }
   
// ESTA FUNÇÃO FECHA A JANELA "Popup" PARA ADICIONAR UMA NOVA MOVIMENTAÇÃO.
   function fecharPopup(){
       const NovaMovimentacao = document.getElementById("NovaMovimentacao");
       if (NovaMovimentacao) {
           NovaMovimentacao.style.opacity = "0"; // Define a opacidade como 0 para torná-lo invisível
           NovaMovimentacao.style.zIndex = "-1"; // Define o índice z como -1 para ocultar o elemento atrás de outros elementos
           NovaMovimentacao.classList.add("OcultarPopup");
       }

   }

   function salvarMovimentacao() {
       const Data = document.getElementById("Data").value;
       const CodiProduto = document.getElementById("CodiProduto").value;
       const Produto = document.getElementById("Produto").value;
       const EstiloProduto = document.getElementById("EstiloProduto").value;
       const CustoCompra = document.getElementById("CustoCompra").value;
       const PrecoCompra = document.getElementById("PrecoCompra").value;
       const PrecoVenda = document.getElementById("PrecoVenda").value;
       const TipoSaida = document.getElementById("TipoSaida").value;
       const ValorLucro = document.getElementById("ValorLucro").value;
   
       // VERIFICA SE TODOS OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS.
       if (Data !== '' && CodiProduto !== '' && Produto !== '' && EstiloProduto !== '' && CustoCompra !== '' && PrecoCompra !== '' 
           && PrecoVenda !== '' && TipoSaida !== '' && ValorLucro !== '') {
   
           const dados = {
               data_entrada: Data,
               codi_produto: CodiProduto,
               produto: Produto,
               estilo_produto: EstiloProduto,
               custo_compra: CustoCompra,
               preco_compra: PrecoCompra,
               preco_venda: PrecoVenda,
               tipo_saida: TipoSaida,
               preco_lucro: ValorLucro,
           };
   
           fetch('cadastrar_movimentacao.php', {
               method: 'POST',
               headers: {
                   'Content-type': 'application/json'
               },
               body: JSON.stringify(dados)
           })
           .then(response => response.json())
           .then(data => {
               if (data.success){
                   alert('Cadastro feito com sucesso!');
                   fecharPopup();
                   atualizarTabelaMovimentacao();
               } else {
                   if (data.code === 1) {
                       alert('Código ou produto incompatíveis na tabela movimentação. Favor preencher corretamente.');
                   } else if (data.code === 2) {
                       alert('Código de produto já cadastrado com outro produto. Favor preencher corretamente.');
                   } else {
                       alert('Código ou incompatíveis. Favor preencher corretamente.');
                   }
               }
           })
           .catch(error => {
               console.error('Erro na requisição:', error);
               alert('Erro ao salvar movimentação. Por favor, tente novamente mais tarde.');
           });
       } else {
           alert('Por favor, preencha todos os campos obrigatórios.');
       }
   }
   
function carregarMovimentacao() {
    fetch('carregar_movimentacao.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('MovimentacaoTableBody').innerHTML = data;
            adicionarEventosEditar(); // Adicionar eventos de edição aos ícones de edição
            adicionarEventosExcluir(); // Adicionar eventos de exclusão aos ícones de exclusão
            fecharPopup();
    });
}
   carregarMovimentacao();
                           
function atualizarTabelaMovimentacao() {
       fetch('movimentacao.php')
           .then(response => response.text())
           .then(data => {
               document.getElementById('dadosMovimentacao').innerHTML = data;
               adicionarEventosEditar();
               adicionarEventosExcluir();
               fecharPopup();
    });
}
   atualizarTabelaMovimentacao();

/*************************************************************************************************************************/
function adicionarEventosEditar() {
   const iconesEditar = document.querySelectorAll('.editar');
   const NovaMovimentacao = document.getElementById("NovaMovimentacao");

   iconesEditar.forEach(icone => {
       icone.addEventListener('click', function () {
           if (confirm('Deseja realmente editar os dados?')) {
               const idMovimentacao = icone.getAttribute('data-id');

            // FUNÇÃO WHILE, UMA OUTRA OPÇÃO PARA CARREGAR OS DADOS DA TABELA MOVIMENTAÇÃO PARA A JENELA OCULTA (OcultarPopup)
               /* Encontrar o ancestral tr
               let row = icone.parentNode;
               while (row.tagName !== 'TR') {
                   row = row.parentNode;
               }*/

               // Obtendo os dados da linha correspondente
               const row = icone.closest('tr');
               const cells = row.querySelectorAll('td');

               const data = cells[1].textContent.trim();
               const codiproduto = cells[2].textContent.trim();
               const produto = cells[3].textContent.trim();
               const estiloproduto = cells[4].textContent.trim();
               const custocompra = cells[5].textContent.trim();
               const precocompra = cells[6].textContent.trim();
               const precovenda = cells[7].textContent.trim();
               const tiposaida = cells[8].textContent.trim();
               const valorlucro = cells[9].textContent.trim();

               // Preenchendo os campos do formulário de edição
               document.getElementById("Data").value = data;
               document.getElementById("CodiProduto").value = codiproduto;
               document.getElementById("Produto").value = produto;
               document.getElementById("EstiloProduto").value = estiloproduto;
               document.getElementById("CustoCompra").value = custocompra;
               document.getElementById("PrecoCompra").value = precocompra;
               document.getElementById("PrecoVenda").value = precovenda;
               document.getElementById("TipoSaida").value = tiposaida;
               document.getElementById("ValorLucro").value = valorlucro;

               // Exibindo a janela popup de edição
               NovaMovimentacao.style.opacity = "1";
               NovaMovimentacao.style.zIndex = "1";
               NovaMovimentacao.classList.remove("OcultarPopup");
               document.getElementById("TituloPopup").innerHTML = "Editar Movimentação";

               // Definindo o id da movimentação para ser usado no salvamento
               const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
               document.getElementById("Produto").setAttribute('data-idMovimentacao', idMovimentacao);

               // Removendo e adicionando o evento de salvar para garantir que apenas uma instância seja executada
               BtnSalvarPopup.removeEventListener("click", salvarMovimentacao);
               BtnSalvarPopup.addEventListener("click", function () {
                   editarMovimentacao(idMovimentacao);
               });
           }
       });
   });
}

function editarMovimentacao(idMovimentacao) {
   const NovaMovimentacao = document.getElementById("NovaMovimentacao");
   if(NovaMovimentacao) {
       NovaMovimentacao.style.opacity = "1";
       NovaMovimentacao.style.zIndex = "1";
       NovaMovimentacao.classList.remove("OcultarPopup");

       const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
       BtnSalvarPopup.addEventListener("click", function(){
           atualizarMovimentacao(idMovimentacao);
      });
   }
}


function validarValores(valor) {
   // Expressão regular para verificar se o valor está no formato correto
   const VerificarVR = /^(?:R\$\s*)?\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/;
   return VerificarVR.test(valor);
}


function atualizarMovimentacao(idMovimentacao) {
   const data = document.getElementById("Data").value;
   const codiproduto = document.getElementById("CodiProduto").value;
   const produto = document.getElementById("Produto").value;
   const estiloproduto = document.getElementById("EstiloProduto").value;
   const custocompra = document.getElementById("CustoCompra").value;
   const precocompra = document.getElementById("PrecoCompra").value;
   const precovenda = document.getElementById("PrecoVenda").value;
   const tiposaida = document.getElementById("TipoSaida").value;
   const valorlucro = document.getElementById("ValorLucro").value;

   // Verifica se os valores são válidos usando a função validarValores(valor)
   if (!validarValores(custocompra) || !validarValores(precocompra) || !validarValores(precovenda) || !validarValores(valorlucro)) {
      // Se os valores forem inválidos, exibe um alerta e retorna
      alert('Por favor, digite os valores corretamente, respeitando as casas decimais.');
      return;
  }

   const dados = {
       id_movimentacao: idMovimentacao,
       data_entrada: data,
       codi_produto: codiproduto,
       produto: produto,
       estilo_produto: estiloproduto,
       custo_compra: custocompra,
       preco_compra: precocompra,
       preco_venda: precovenda,
       tipo_saida: tiposaida,
       preco_lucro: valorlucro,
   };

   fetch('editar_movimentacao.php', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(dados)
  })
  
  .then(data => {
      if(data.success) {
          
      }
  })
  
      alert('Dados atualizados com sucesso! ' );
      fecharPopup();
      atualizarTabelaMovimentacao();
      
}

function carregarMovimentacao() {
   fetch('carregar_movimentacao.php')
       .then(response => response.text())
       .then(data => {
           document.getElementById('MovimentacaoTableBody').innerHTML = data;
           adicionarEventosEditar(); // Adicionar eventos de edição aos ícones de edição
           adicionarEventosExcluir(); // Adicionar eventos de exclusão aos ícones de exclusão
           fecharPopup();
    });
}

    carregarMovimentacao();

function atualizarTabelaMovimentacao() {
    fetch('movimentacao.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('dadosMovimentacao').innerHTML = data;
            adicionarEventosEditar(); // Adicionar eventos de edição aos ícones de edição
            adicionarEventosExcluir();
            fecharPopup();
    })
}
   atualizarTabelaMovimentacao();

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
               fetch(`excluir_movimentacao.php?id=${CodiProduto}`, {
                       method: 'DELETE'
           })
               .then(response => response.json())
               .then(data => {
                   if (data.success) {
// Recarregar a tabela após a exclusão
                       carregarMovimentacao();
                       alert('Movimentação excluído com sucesso!');
                   } else {
                       alert('Erro ao excluir o colaborador!');
                   }
               })
           }
       });
   });
}

/********************************************************************************************************************************/
function fetchMovimentacao() {
fetch('movimentacao.php')
  .then(response => response.text())
  .then(data => {
      const dadosMovimentacao = document.getElementById('dadosMovimentacao');
      if (dadosMovimentacao) {
          dadosMovimentacao.innerHTML = data;
      }
   })
}

document.addEventListener("DOMContentLoaded", function() {
const F_Filtragem = document.querySelector("#F_Filtragem");

F_Filtragem.addEventListener("input", (evt) => {
  const termoFiltro = evt.target.value.toUpperCase();
  const Linhas = document.querySelectorAll("#MovimentacaoTableBody tr");

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
