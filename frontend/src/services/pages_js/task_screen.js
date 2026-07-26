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
                        <span class="task-title">${nomeDaTask}</span>
                    </label>
                    <div class="task-actions">
                        <span class="task-status pending">${statusDaTask}</span>
                        <button class="task-edit-btn" type="button" aria-label="Editar task">✎</button>
                    </div>
                </li>
            `;
        });
        
        ulTaskList.innerHTML = tasksHTML;
    } else {
        ulTaskList.innerHTML = '<li><span style="color: #666;">Nenhuma task cadastrada ainda.</span></li>';
    }
}
