const btnHome = document.getElementById('home');
const btnAccount = document.getElementById('account');
const btnConfig = document.getElementById('config');

function homeScreanSwitch(){
    window.location.href = "homeScrean.html";
}

function accountScreanSwitch(){
    window.location.href = "accountScrean.html";
}

function configScreanSwitch(){
    window.location.href = "configurationScrean.html";
}

btnHome.addEventListener('click', homeScreanSwitch);
btnAccount.addEventListener('click', accountScreanSwitch);
btnConfig.addEventListener('click', configScreanSwitch);

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
});

// PASSO 1: Função que vai buscar os dados no Python
async function buscarDadosDoBanco() {
    try {
        // Faz o "Pedido" para a nova rota GET do Flask
        const resposta = await fetch('http://127.0.0.1:5000/listar-dados');

        if (!resposta.ok) {
            throw new Error(`Erro de rede! Status: ${resposta.status}`);
        }

        // Abre o pacote JSON enviado pelo Python
        const dados = await resposta.json();
        console.log("Dados que vieram do Banco de Dados:", dados);

        // --- NOVA LÓGICA: PREENCHER A TABELA ---
        
        // 1. Encontra o corpo da tabela onde as linhas vão entrar
        const corpoTabela = document.getElementById('tabela-tasks-corpo');

        // 2. Limpa os exemplos fixos (mock) que estavam no HTML
        corpoTabela.innerHTML = "";

        // Verifica se o banco não retornou nada (tabela vazia)
        if (dados.length === 0) {
            corpoTabela.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align: center; color: var(--texto-secundario);">
                        Nenhuma tarefa encontrada.
                    </td>
                </tr>
            `;
            return; // Encerra a função aqui
        }

        // 3. Percorre cada item (tarefa) que veio do banco de dados
        dados.forEach(item => {
            // Verifica se a tarefa está concluída (true/1) ou não
            const isConcluida = item.complete === true || item.complete === 1;
            
            // Define o texto, a classe e o estado do checkbox baseado no status
            const textoStatus = isConcluida ? 'Concluída' : 'Pendente';
            const classeStatus = isConcluida ? 'concluida' : 'pendente';
            const estadoCheckbox = isConcluida ? 'checked' : '';

            // Usa o template string (crases ` `) para montar o HTML da linha
            // NOTA: Se no banco o nome da coluna de data for diferente, mude "item.date_task" para o nome exato
            const linhaHTML = `
                <tr>
                    <td>${item.task}</td>
                    <td>${item.date_task}</td>
                    <td>
                        <div class="status-container">
                            <input type="checkbox" class="task-checkbox" ${estadoCheckbox}>
                            <span class="badge ${classeStatus}">${textoStatus}</span>
                        </div>
                    </td>
                </tr>
            `;

            // 4. Injeta a linha criada dentro da tabela
            corpoTabela.innerHTML += linhaHTML;
        });

    } catch (erro) {
        console.error("Falha ao buscar os dados:", erro);
        const corpoTabela = document.getElementById('tabela-tasks-corpo');
        if (corpoTabela) {
             corpoTabela.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #ff5555;">Erro ao carregar tarefas. Verifique o console.</td></tr>`;
        }
    }
}