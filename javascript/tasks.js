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
                        <input type="checkbox" class="task-checkbox" ${estadoCheckbox}>
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