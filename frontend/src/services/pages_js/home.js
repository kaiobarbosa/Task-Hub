document.addEventListener('DOMContentLoaded', () => {
    const dadosSalvos = localStorage.getItem('dadosUsuario');
    
    if (dadosSalvos) {
        const usuarioLogado = JSON.parse(dadosSalvos);
        const idUsuario = usuarioLogado[0][0]; 

        fetch(`http://127.0.0.1:5000/user_tasks/${idUsuario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            const tasks = data.tasks || []; 
            
            // 1. Renderiza a lista de tasks na esquerda
            renderizarListaTasks(tasks);
            
            // 2. Renderiza os dias concluídos no calendário na direita
            renderizarCalendario(tasks);
        })
        .catch(error => console.error("Erro:", error));
        
    } else {
        alert("Você precisa estar logado!");
        window.location.href = "login.html"; 
    }
});

// Função que cuida da lista de tarefas na esquerda
function renderizarListaTasks(tasks) {
    const ulTaskList = document.querySelector('.task-list');
    ulTaskList.innerHTML = ''; 

    if (tasks.length > 0) {
        let tasksHTML = ''; 
        
        tasks.forEach(task => {
            const nomeDaTask = task[2];   
            const statusDaTask = task[6]; 

            let classeStatus = 'pending'; 
            if (statusDaTask && statusDaTask.toLowerCase().includes('conclu')) {
                classeStatus = 'done';
            }

            tasksHTML += `
                <li>
                  <span>${nomeDaTask}</span>
                  <span class="task-status ${classeStatus}">${statusDaTask}</span>
                </li>
            `;
        });
        
        ulTaskList.innerHTML = tasksHTML;
    } else {
        ulTaskList.innerHTML = '<li><span style="color: #666;">Nenhuma task cadastrada ainda.</span></li>';
    }
}

// Função NOVA: Cuida do destaque verde no calendário
function renderizarCalendario(tasks) {
    // A. Seleciona todos os botões de dia do calendário (.calendar-day)
    const botoesDias = document.querySelectorAll('.calendar-grid .calendar-day');

    // B. Limpa a marcação estática (remove a classe .selected de todos os botões)
    botoesDias.forEach(botao => botao.classList.remove('selected'));

    // C. Cria um conjunto (Set) com os números dos dias que possuem tasks concluídas
    const diasCompletos = new Set();

    tasks.forEach(task => {
        const status = task[6];
        const dataString = task[4];
        //AAAA-MM-DD HH:MM:SS

        if (status && status.toLowerCase().includes('conclu') && dataString) {
            
            const dataObjeto = new Date(dataString);
            
            const diaDoMes = dataObjeto.getDate(); 
            diasCompletos.add(diaDoMes);
        }
    });

    // D. Percorre os botões do HTML e adiciona a classe .selected nos dias correspondentes
    botoesDias.forEach(botao => {
        const numeroDoBotao = parseInt(botao.textContent.trim(), 10);

        if (diasCompletos.has(numeroDoBotao)) {
            botao.classList.add('selected'); // Aplica o fundo verde!
        }
    });
}