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
        console.log("1. Tentando conectar com o Python...");
        
        // Lembre-se: se no seu navegador a barra de endereço estiver "localhost:5500", 
        // mude o "127.0.0.1" abaixo para "localhost" também!
        const resposta = await fetch('http://127.0.0.1:5001/listar-dados');

        if (!resposta.ok) {
            throw new Error(`Erro de rede! Status: ${resposta.status}`);
        }

        console.log("2. Conexão feita! Lendo os dados...");
        const dados = await resposta.json();
        
        console.log("3. Sucesso! Dados recebidos:", dados);

        // --- LÓGICA DE PREENCHER A TABELA ---
        const corpoTabela = document.getElementById('tabela-tasks-corpo');

        if (!corpoTabela) {
            console.error("4. ERRO: O JavaScript não encontrou a tag <tbody id='tabela-tasks-corpo'> no seu HTML!");
            return;
        }

        corpoTabela.innerHTML = ""; // Limpa os exemplos mockados

        if (dados.length === 0) {
            corpoTabela.innerHTML = `<tr><td colspan="3" style="text-align: center;">Nenhuma tarefa encontrada no banco.</td></tr>`;
            return;
        }

        // Percorre os dados e cria as linhas
        dados.forEach(item => {
            const isConcluida = item.complete === true || item.complete === 1 || item.complete === "true";
            const textoStatus = isConcluida ? 'Concluída' : 'Pendente';
            const classeStatus = isConcluida ? 'concluida' : 'pendente';
            const estadoCheckbox = isConcluida ? 'checked' : '';

            // ATENÇÃO: Confirme se no seu banco as colunas chamam 'task' e 'date_task'. 
            // Se forem diferentes (ex: 'tarefa', 'data'), mude aqui embaixo.
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
            corpoTabela.innerHTML += linhaHTML;
        });
        
        console.log("5. Tabela preenchida com sucesso!");

    } catch (erro) {
        console.error("ERRO GRAVE AO BUSCAR DADOS:", erro);
    }
}