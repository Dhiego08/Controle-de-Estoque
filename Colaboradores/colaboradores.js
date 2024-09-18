let telefones = [];

document.addEventListener("DOMContentLoaded", function() {
    const NovoColaborador = document.getElementById("NovoColaborador");

    if (NovoColaborador) {
        const BtnAdd = document.getElementById("BtnAdd");

        if (BtnAdd) {
            BtnAdd.addEventListener("click", () => {
                NovoColaborador.style.opacity = "1";
                NovoColaborador.style.zIndex = "1";
                NovoColaborador.classList.remove("OcultarPopup");
                document.getElementById("TituloPopup").innerHTML="Novo Colaborador";
                NovoColaborador.classList.remove("OcultarPopup");

 // Limpar os telefones ao abrir o formulário de edição
        const telefonesContainer = document.getElementById("Telefones");
        if (telefonesContainer) {
            telefonesContainer.innerHTML = '';
        }

                document.getElementById("F_Nome").value = "";
                document.getElementById("F_Tipo").value = "";
                document.getElementById("F_Statu").value = "";
                document.getElementById("F_Fone").value = "";
                document.getElementById("Telefones").value = "";

            });
        }

        const BtnFecharPopup = document.getElementById("BtnFecharPopup");
        const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
        const BtnCancelarPopup = document.getElementById("BtnCancelarPopup");

        if (BtnFecharPopup && BtnSalvarPopup && BtnCancelarPopup) {
            BtnFecharPopup.addEventListener("click", fecharPopup);
            BtnSalvarPopup.addEventListener("click", salvarColaborador);
            BtnCancelarPopup.addEventListener("click", fecharPopup);
        }
    }
        
});

function fecharPopup() {
    const NovoColaborador = document.getElementById("NovoColaborador");
    if (NovoColaborador) {
        NovoColaborador.style.opacity = "0";
        NovoColaborador.style.zIndex = "-1";
        NovoColaborador.classList.add("OcultarPopup");
        telefones = [];
    }
}


function salvarColaborador() {
    const nome = document.getElementById("F_Nome").value;
    const tipo = document.getElementById("F_Tipo").value;
    const status = document.getElementById("F_Statu").value;

    const numerosTelefone = document.querySelectorAll(".NumTel");
    
     numerosTelefone.forEach(numero => {
        const numeroTelefone = numero.textContent.trim();
        if (numeroTelefone !== '') {
            telefones.push(numeroTelefone);
    }
});

    if (nome !== '' && tipo !== '' && status !== '' && telefones.length > 0) {
        const dados = {
            nome: nome,
            tipo: tipo,
            status: status,
            telefones: telefones
        };

        fetch('cadastrar_colaborador.php', {
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
                fecharPopup(); // Feche a janela de edição após a atualização
                fetchColaboradores();
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
    } else {
        alert('Preencha todos os campos obrigatórios e adicione pelo menos um número de telefone.');
    }
}

        const inputTelefone = document.getElementById("F_Fone");
        const telefonesContainer = document.getElementById("Telefones");

        if (inputTelefone && telefonesContainer) {
            inputTelefone.addEventListener("keyup", adicionarTelefone);

        }

function adicionarTelefone(event) {
    if (event.key === "Enter") {
        const inputTelefone = document.getElementById("F_Fone");
        const numeroTelefone = inputTelefone.value.trim();

        if (numeroTelefone !== '') {
            const novoTelefone = document.createElement("div");
            novoTelefone.setAttribute("class", "Tel");

            const numero = document.createElement("div");
            numero.setAttribute("class", "NumTel");
            numero.textContent = numeroTelefone;

            const deleteIcon = document.createElement("img");
            deleteIcon.src = "../../Imagens/Delete.svg";
            deleteIcon.classList.add("DelTel");
            
            deleteIcon.addEventListener("click", function() {
                novoTelefone.remove();
            });

            novoTelefone.appendChild(numero);
            novoTelefone.appendChild(deleteIcon);

            const telefonesContainer = document.getElementById("Telefones");
            if (telefonesContainer) {
                telefonesContainer.appendChild(novoTelefone);
            }

            inputTelefone.value = ''; // Limpar o campo de entrada após adicionar o telefone
            inputTelefone.focus(); // Dar foco ao campo de entrada após adicionar o telefone
        }
    }
}

/********************************************************************************************************************************************/
function adicionarEventosEditar() {
    const iconesEditar = document.querySelectorAll('.editar');
    const NovoColaborador = document.getElementById("NovoColaborador");

    iconesEditar.forEach(icone => {
        icone.addEventListener('click', function() {
            if (confirm('Deseja realmente editar os dados?')) {
                const idColaborador = icone.getAttribute('data-id');
                const nomeColaborador = icone.parentElement.parentElement.querySelector('td:nth-child(2)').textContent.trim();
                const tipoColaborador = icone.parentElement.parentElement.querySelector('td:nth-child(3)').textContent.trim();
                const statusColaborador = icone.parentElement.parentElement.querySelector('td:nth-child(4)').textContent.trim();
                const numerosTelefone = icone.getAttribute('data-telefones').split(','); 

                document.getElementById("F_Nome").value = nomeColaborador;
                document.getElementById("F_Tipo").value = tipoColaborador;
                document.getElementById("F_Statu").value = statusColaborador;

                // Limpa os telefones existentes no contêiner
                const telefonesContainer = document.getElementById("Telefones");
                telefonesContainer.innerHTML = '';

                // Adiciona os telefones já cadastrados ao contêiner
                numerosTelefone.forEach(numero => {
                    const novoTelefone = document.createElement("div");
                    novoTelefone.setAttribute("class", "Tel");

                    const numeroElement = document.createElement("div");
                    numeroElement.setAttribute("class", "NumTel");
                    numeroElement.textContent = numero;

                    const deleteIcon = document.createElement("img");
                    deleteIcon.src = "../../Imagens/Delete.svg";
                    deleteIcon.classList.add("DelTel");

                    deleteIcon.addEventListener("click", function() {
                        novoTelefone.remove();
                    });

                    novoTelefone.appendChild(numeroElement);
                    novoTelefone.appendChild(deleteIcon);
                    telefonesContainer.appendChild(novoTelefone);
                });

                NovoColaborador.style.opacity = "1";
                NovoColaborador.style.zIndex = "1";
                NovoColaborador.classList.remove("OcultarPopup");
                document.getElementById("TituloPopup").innerHTML = "Editar Colaborador";
                NovoColaborador.classList.remove("OcultarPopup");

                const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
                BtnSalvarPopup.removeEventListener("click", salvarColaborador);
                BtnSalvarPopup.addEventListener("click", function() {
                    editarColaborador(idColaborador);
                });
            }
        });
    });
}

function editarColaborador(idColaborador) {
    const NovoColaborador = document.getElementById("NovoColaborador");
    if (NovoColaborador) {
        NovoColaborador.style.opacity = "1";
        NovoColaborador.style.zIndex = "1";
        NovoColaborador.classList.remove("OcultarPopup");

        const BtnSalvarPopup = document.getElementById("BtnSalvarPopup");
        BtnSalvarPopup.addEventListener("click", function () {
            atualizarColaborador(idColaborador);
        });
    }
}

function atualizarColaborador(idColaborador) {
    const nome = document.getElementById("F_Nome").value;
    const tipo = document.getElementById("F_Tipo").value;
    const status = document.getElementById("F_Statu").value;
    const numerosTelefone = document.querySelectorAll(".NumTel");
   
    numerosTelefone.forEach(numero => {
        const numeroTelefone = numero.textContent.trim();
        if (numeroTelefone !== '') {
            telefones.push(numeroTelefone);
        }
    });

    const dados = {
        id: idColaborador,
        nome: nome,
        tipo: tipo,
        status: status,
        telefones: telefones // Inclua os telefones aqui
    };

    fetch('editar_colaborador.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Colaborador atualizado com sucesso!');
            fecharPopup(); // Feche a janela de edição após a atualização
            fetchColaboradores(); // Carregar os colaboradores automaticamente após a atualização
        } else {
            alert('Erro ao atualizar o colaborador!');
        }
    })
}

// Função para carregar os colaboradores na tabela
function carregarColaboradores() {
    fetch('carregar_colaboradores.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('colaboradoresTableBody').innerHTML = data;
            adicionarEventosEditar();
            adicionarEventosExcluir();
        })
    }
// Chamada inicial para carregar os colaboradores na tabela
carregarColaboradores();

/********************************************************************************************************************************/
// Função para adicionar eventos de excluir aos ícones
function adicionarEventosExcluir() {
    const iconesExcluir = document.querySelectorAll('.excluir');
    iconesExcluir.forEach(icone => {
        icone.addEventListener('click', function() {
            if (confirm('Deseja realmente excluir o cadastro?')) {
                const idColaborador = icone.getAttribute('data-id');
                // Código para excluir o colaborador com o ID especificado
                // Utilize uma requisição fetch ou outra forma de comunicação com o servidor para deletar o colaborador
                fetch(`excluir_colaborador.php?id=${idColaborador}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Recarregar a tabela após a exclusão
                        carregarColaboradores();
                        alert('Colaborador excluído com sucesso!');
                    } else {
                        alert('Erro ao excluir o colaborador!');
                    }
                })
                
            }
        });
    });
}

/*************************************************************************************************************************************/
function fetchColaboradores() {
    fetch('colaboradores.php')
        .then(response => response.text())
        .then(data => {
            const dadosColaboradores = document.getElementById('dadosColaboradores');
            if (dadosColaboradores) {
                dadosColaboradores.innerHTML = data;
            }
        })
        
}

document.addEventListener("DOMContentLoaded", function() {
    const F_Filtragem = document.querySelector("#F_Filtragem");

    F_Filtragem.addEventListener("input", (evt) => {
        const termoFiltro = evt.target.value.toUpperCase();
        const Linhas = document.querySelectorAll("#colaboradoresTableBody tr");

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




