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

        })
        .catch(error => console.error("Erro:", error));
        
    } else {
        alert("Você precisa estar logado!");
        window.location.href = "login.html"; 
    }
});

function renderizarListaTasks(tasks) {
    const ulTaskList = document.querySelector('.task-list');
    ulTaskList.innerHTML = ''; 

    if (tasks.length > 0) {
        let tasksHTML = ''; 
        
        tasks.forEach(task => {
            const idTask = task[0];
            const nomeDaTask = task[2];   
            const statusDaTask = task[6]; 

            let classeStatus = 'pending'; 
            if (statusDaTask && statusDaTask.toLowerCase().includes('conclu')) {
                classeStatus = 'done';
            }

            tasksHTML += `
                <li class="task-item">
                    <label class="task-label">
                        <input class="task-checkbox" type="checkbox" />
                        <span class="id_da_task">${idTask}</span>
                        <span class="task-title">${nomeDaTask}</span>
                    </label>
                    <div class="task-actions">
                        <span class="task-status pending">${statusDaTask}</span>
                        <button class="task-edit-btn" type="button" aria-label="Editar task">✏️</button>
                        <button class="task-edit-btn" type="button" aria-label="Editar task">🗑️</button>
                    </div>
                </li>
            `;
        });
        
        ulTaskList.innerHTML = tasksHTML;
    } else {
        ulTaskList.innerHTML = '<li><span style="color: #666;">Nenhuma task cadastrada ainda.</span></li>';
    }
}
const formCreate = document.querySelector('.tasks-hero');
const btnCreate = document.querySelector('.btn-submit');
const containerDeTasks = document.querySelector('.task-list');

// Usamos o evento 'change' pois ele é o ideal para lidar com inputs do tipo checkbox
containerDeTasks.addEventListener('change', (event) => {
    
    // Verifica se o alvo clicado realmente tem a classe da checkbox
    if (event.target.classList.contains('task-checkbox')) {
        
        // Pega APENAS a linha (li) correspondente à checkbox que foi clicada
        const checkbox = event.target;
        const item = checkbox.closest('.task-item');
        
        // Seleciona os elementos apenas dentro dessa linha
        const status = item.querySelector('.task-status');
        
        // CORREÇÃO DO ID: Pegamos o texto, tiramos os espaços e convertemos para Número Inteiro
        const idTaskTexto = item.querySelector('.id_da_task').textContent.trim();
        const idTask = parseInt(idTaskTexto, 10);

        const completed = checkbox.checked;
        item.classList.toggle('completed', completed);

        if (completed) {
            status.textContent = 'Concluído';
            status.classList.remove('pending');
            status.classList.add('done');
            
            updateTaskStatus(completed, idTask);

        } else {
            status.textContent = 'Pendente';
            status.classList.remove('done');
            status.classList.add('pending');
        
            updateTaskStatus(completed, idTask);
        }
    }
});

async function updateTaskStatus(completed, idTask){
    
    const dataJson = {
        "id_task" : idTask,
        "statusChange" : completed
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/task_update_status', { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        });
        
        const result = await response.json();

        if (response.ok) {
            alert(result.message || "atualizaçao realizada com sucesso!");
        } else {
            alert("Ops! Erro ao atualizar: " + (result.erro || "Verifique os dados")); 
        }

    } catch (error) {
        console.error("Erro de conexão com o servidor:", error);
        alert("Não foi possível conectar ao servidor. Verifique se o Flask está rodando.");
    }
}

formCreate.addEventListener("submit", async (event) => {

     const dadosSalvos = localStorage.getItem('dadosUsuario');
     const dadosUser = JSON.parse(dadosSalvos)

     const inputNameTask = document.getElementById('task-name').value;
     const inputDescTask = document.getElementById('task-description').value;
     const idUsuario = dadosUser[0][0];

     const tasks_data={
        name: inputNameTask,
        description: inputDescTask,
        id_user: idUsuario
     }
     
     console.log(tasks_data)

    try {
        const response = await fetch('http://127.0.0.1:5000/task_insert', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tasks_data)
        });
        
        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Cadastro realizado com sucesso!");
        } else {
            alert("Ops! Erro ao cadastrar: " + (result.erro || "Verifique os dados")); 
        }

    } catch (error) {
        console.error("Erro de conexão com o servidor:", error);
        alert("Não foi possível conectar ao servidor. Verifique se o Flask está rodando.");
    } finally {
        
    }

});