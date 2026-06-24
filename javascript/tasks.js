const btnHome = document.getElementById('home');
const btnAccount = document.getElementById('account');
const btnConfig = document.getElementById('config');
const btnSearch = document.getElementById('searchButton'); // CORRIGIDO: Agora aponta para o ID correto do HTML

function homeScreanSwitch(){
    window.location.href = "homeScrean.html";
}

function accountScreanSwitch(){
    window.location.href = "accountScrean.html";
}

function configScreanSwitch(){
    window.location.href = "configurationScrean.html";
}

if(btnHome) btnHome.addEventListener('click', homeScreanSwitch);
if(btnAccount) btnAccount.addEventListener('click', accountScreanSwitch);
if(btnConfig) btnConfig.addEventListener('click', configScreanSwitch);


// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("#sidebar-nav .menu-item");

  // Chama a função para buscar os dados no banco assim que a tela abre
  buscarDadosDoBanco();

  menuItems.forEach(item => {
    item.addEventListener("click", function(event) {
      if (this.getAttribute("href") !== "#") {
        return; 
      }
      event.preventDefault();
      menuItems.forEach(i => i.classList.remove("ativo"));
      this.classList.add("ativo");
    });
  });

  // Configuração do Evento de Clique do Botão de Pesquisa
  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
        const query = document.getElementById('inputSearch').value.trim();

        console.log(`Buscando no banco por: ${query}`);

        // CORRIGIDO: Adicionado o endereço completo do seu backend na porta 5001
        fetch(`http://127.0.0.1:5001/api/search?query=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(tasksFiltradas => {
                // Atualiza a tabela com o resultado retornado do banco
                renderizarTarefas(tasksFiltradas);
            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
            });
    });
  }
});

// Função única para atualizar a tabela na tela
function renderizarTarefas(tasks) {
    const corpoTabela = document.getElementById('tabela-tasks-corpo');

    if (!corpoTabela) {
        console.error("ERRO: O JavaScript não encontrou a tag <tbody id='tabela-tasks-corpo'> no seu HTML!");
        return;
    }

    corpoTabela.innerHTML = ""; // Limpa os registros antigos da tabela

    if (tasks.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 15px;">Nenhuma tarefa encontrada.</td></tr>`;
        return;
    }

    // Percorre os dados vindos do banco de dados e cria as linhas dinamicamente
    tasks.forEach(item => {
        // CORRIGIDO: Tratando o campo 'status' vindo do seu operationsdb.py em vez de 'complete'
        const statusTexto = item.status ? item.status.toString().toLowerCase() : 'pendente';
        const isConcluida = statusTexto === 'concluída' || statusTexto === 'concluida';
        
        const textoExibicao = isConcluida ? 'Concluída' : (item.status || 'Pendente');
        const classeStatus = isConcluida ? 'concluida' : 'pendente';
        const estadoCheckbox = isConcluida ? 'checked' : '';

        const linhaHTML = `
            <tr>
                <td>${item.task || "Sem título"}</td>
                <td>${item.date_task || "--/--/----"}</td>
                <td>
                    <div class="status-container">
                        <input type="checkbox" class="task-checkbox" data-id="${item.id}" ${estadoCheckbox}>
                        <span class="badge ${classeStatus}">${textoExibicao}</span>
                    </div>
                </td>
            </tr>
        `;
        corpoTabela.innerHTML += linhaHTML;
    });
    
    console.log("Tabela renderizada com sucesso!");
}

// Função que busca a listagem inicial completa ao abrir a página
async function buscarDadosDoBanco() {
    try {
        console.log("1. Tentando conectar com o Python para listagem inicial...");
        const resposta = await fetch('http://127.0.0.1:5001/listar-dados');

        if (!resposta.ok) {
            throw new Error(`Erro de network! Status: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log("2. Dados iniciais recebidos:", dados);

        // Reaproveita a função de renderizar para colocar os dados na tabela
        renderizarTarefas(dados);

    } catch (erro) {
        console.error("ERRO AO CARREGAR LISTA INICIAL:", erro);
    }
}

// Captura a alteração de qualquer checkbox dentro do corpo da tabela
document.getElementById('tabela-tasks-corpo').addEventListener('change', async function(event) {
    // Verifica se o elemento que disparou o evento foi um checkbox de tarefa
    if (event.target.classList.contains('task-checkbox')) {
        const checkbox = event.target;
        const taskId = checkbox.getAttribute('data-id'); // Pega o ID da tarefa
        const isChecked = checkbox.checked;
        const badge = checkbox.nextElementSibling; // Pega o <span> que está logo após o checkbox
        
        // Define o novo status baseado em se o checkbox está marcado ou não
        const novoStatus = isChecked ? 'Concluída' : 'Pendente';

        // 1. Atualiza a interface (Visual) imediatamente para resposta rápida
        if (isChecked) {
            badge.textContent = 'Concluída';
            badge.classList.remove('pendente');
            badge.classList.add('concluida');
        } else {
            badge.textContent = 'Pendente';
            badge.classList.remove('concluida');
            badge.classList.add('pendente');
        }

        // 2. Envia a requisição para o Backend atualizar no Banco de Dados
        try {
            const response = await fetch('http://127.0.0.1:5001/api/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Avisa o Flask que estamos mandando um JSON
                },
                body: JSON.stringify({ 
                    id: taskId, 
                    status: novoStatus 
                })
            });

            if (!response.ok) {
                throw new Error('Falha na resposta do servidor.');
            }

            const resultado = await response.json();
            console.log("Sucesso:", resultado.mensagem);

        } catch (error) {
            console.error("Erro ao atualizar no banco de dados:", error);
            
            // Reverte a alteração visual na tela caso dê erro no backend
            alert("Erro ao salvar o status no servidor. Revertendo alteração.");
            checkbox.checked = !isChecked;
            
            if (!isChecked) { // Reverte para Concluída
                badge.textContent = 'Concluída';
                badge.classList.remove('pendente');
                badge.classList.add('concluida');
            } else { // Reverte para Pendente
                badge.textContent = 'Pendente';
                badge.classList.remove('concluida');
                badge.classList.add('pendente');
            }
        }
    }
});