async function carregarTasksDoUsuario(idUsuario) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/user_tasks/${idUsuario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        const tasks = data.tasks || [];
        renderizarListaTasks(tasks);
        return tasks;
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

function obterIdUsuarioAtual() {
    const dadosSalvos = localStorage.getItem('dadosUsuario');

    if (!dadosSalvos) {
        return null;
    }

    try {
        const dadosUser = JSON.parse(dadosSalvos);
        return dadosUser?.[0]?.[0] ?? null;
    } catch (error) {
        console.error('Erro ao ler usuário logado:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dadosSalvos = localStorage.getItem('dadosUsuario');

    if (dadosSalvos) {
        const usuarioLogado = JSON.parse(dadosSalvos);
        const idUsuario = usuarioLogado[0][0];
        carregarTasksDoUsuario(idUsuario);
    } else {
        alert('Você precisa estar logado!');
        window.location.href = 'login.html';
    }
});

function renderizarListaTasks(tasks) {
    const ulTaskList = document.querySelector('.task-list');
    ulTaskList.innerHTML = '';

    if (tasks.length > 0) {
        const fragment = document.createDocumentFragment();

        tasks.forEach(task => {
            const idTask = task[0];
            const nomeDaTask = task[2];
            const statusDaTask = task[6];

            const li = document.createElement('li');
            li.className = 'task-item';

            const classeStatus = statusDaTask && statusDaTask.toLowerCase().includes('conclu') ? 'done' : 'pending';
            const atributoChecked = classeStatus === 'done' ? 'checked' : '';

            li.innerHTML = `
                <label class="task-label">
                    <input class="task-checkbox" type="checkbox" ${atributoChecked} />
                    <span class="id_da_task">${idTask}</span>
                    <span class="task-title">${nomeDaTask}</span>
                </label>
                <div class="task-actions">
                    <span class="task-status ${classeStatus}">${statusDaTask}</span>
                    <button class="task-edit-btn update" type="button" aria-label="Editar task">✏️</button>
                    <button class="task-edit-btn delete" type="button" aria-label="Editar task">🗑️</button>
                </div>
            `;

            fragment.appendChild(li);
        });

        ulTaskList.appendChild(fragment);
    } else {
        const emptyItem = document.createElement('li');
        emptyItem.innerHTML = '<span style="color: #666;">Nenhuma task cadastrada ainda.</span>';
        ulTaskList.appendChild(emptyItem);
    }
}

const formCreate = document.querySelector('form.task-form');
const containerDeTasks = document.querySelector('.task-list');

function limparFormularioCriacao() {
    if (!formCreate) {
        return;
    }

    if (typeof formCreate.reset === 'function') {
        formCreate.reset();
        return;
    }

    const fields = formCreate.querySelectorAll('input, textarea');
    fields.forEach((field) => {
        field.value = '';
    });
}

containerDeTasks.addEventListener('change', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
        const checkbox = event.target;
        const item = checkbox.closest('.task-item');
        const status = item.querySelector('.task-status');
        const idTaskTexto = item.querySelector('.id_da_task').textContent.trim();
        const idTask = parseInt(idTaskTexto, 10);
        const completed = checkbox.checked;

        item.classList.toggle('completed', completed);

        if (completed) {
            status.textContent = 'Concluído';
            status.classList.remove('pending');
            status.classList.add('done');
        } else {
            status.textContent = 'Pendente';
            status.classList.remove('done');
            status.classList.add('pending');
        }

        updateTaskStatus(completed, idTask);
    }
});

containerDeTasks.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete')) {
        const taskItem = event.target.closest('.task-item');
        const idTaskTexto = taskItem.querySelector('.id_da_task').textContent.trim();
        const idTask = parseInt(idTaskTexto, 10);

        const dataJson = {
            idTask
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/task_delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataJson)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || 'Atualização realizada com sucesso!');
                const idUsuario = obterIdUsuarioAtual();
                if (idUsuario) {
                    await carregarTasksDoUsuario(idUsuario);
                } else {
                    taskItem.remove();
                }
            } else {
                alert('Ops! Erro ao atualizar: ' + (result.erro || 'Verifique os dados'));
            }
        } catch (error) {
            console.error('Erro de conexão com o servidor:', error);
            alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
        }
    }

    if (event.target.classList.contains('update')) {
        const taskItem = event.target.closest('.task-item');
        abrirEdicao(taskItem);
    }
});

function abrirEdicao(taskItem) {
    const activeEditItems = document.querySelectorAll('.task-item.is-editing');
    const alreadyEditing = taskItem.classList.contains('is-editing');

    activeEditItems.forEach(item => {
        const editButton = item.querySelector('.update');
        const editForm = item.querySelector('.task-edit-form');

        item.classList.remove('is-editing');
        if (editButton) {
            editButton.disabled = false;
            editButton.classList.remove('is-disabled');
        }
        if (editForm) {
            editForm.remove();
        }
    });

    if (alreadyEditing) {
        return;
    }

    taskItem.classList.add('is-editing');

    const editButton = taskItem.querySelector('.update');
    if (editButton) {
        editButton.disabled = true;
        editButton.classList.add('is-disabled');
    }

    const editForm = document.createElement('div');
    editForm.className = 'task-edit-form';
    editForm.innerHTML = `
        <label class="form-group">
            <span>Novo nome da task</span>
            <input type="text" id="edit-task-name" placeholder="Novo nome da task" />
        </label>
        <label class="form-group">
            <span>Nova descrição da task</span>
            <textarea id="edit-task-description" placeholder="Nova descrição da task"></textarea>
        </label>
        <div class="task-edit-form-actions">
            <button class="btn-secondary" type="button">Cancelar</button>
            <button class="btn-primary" type="button">Salvar alterações</button>
        </div>
    `;

    taskItem.appendChild(editForm);

    const cancelBtn = editForm.querySelector('.btn-secondary');
    cancelBtn.addEventListener('click', () => {
        taskItem.classList.remove('is-editing');
        if (editButton) {
            editButton.disabled = false;
            editButton.classList.remove('is-disabled');
        }
        editForm.remove();
    });

    const saveBtn = editForm.querySelector('.btn-primary');
    saveBtn.addEventListener('click', () => {
        const inputName = editForm.querySelector('#edit-task-name');
        const inputDesc = editForm.querySelector('#edit-task-description');
        const titleElement = taskItem.querySelector('.task-title');

        if (inputName && titleElement && inputName.value.trim()) {
            titleElement.textContent = inputName.value.trim();

            updateTaskName(taskItem, inputName.value.trim(), inputDesc.value.trim());

        }

        taskItem.classList.remove('is-editing');
        if (editButton) {
            editButton.disabled = false;
            editButton.classList.remove('is-disabled');
        }
        editForm.remove();
    });
}

async function updateTaskName(taskItem, newName, newDescription) {
    const idTaskTexto = taskItem.querySelector('.id_da_task').textContent.trim();
    const idTask = parseInt(idTaskTexto, 10);
    
    const dataJson = {
        id_task: idTask,
        new_name: newName,
        new_description: newDescription
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/task_update_name_description', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataJson)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Atualização realizada com sucesso!');
            const idUsuario = obterIdUsuarioAtual();
            if (idUsuario) {
                await carregarTasksDoUsuario(idUsuario);
            }
        } else {
            taskItem.remove();
        }
    } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
    }
}

async function updateTaskStatus(completed, idTask) {
    const dataJson = {
        id_task: idTask,
        statusChange: completed
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/task_update_status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataJson)
        });

        const result = await response.json();

        if (!response.ok) {
            alert('Ops! Erro ao atualizar: ' + (result.erro || 'Verifique os dados'));
        }
    } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
    }
}

formCreate.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dadosSalvos = localStorage.getItem('dadosUsuario');
    const dadosUser = JSON.parse(dadosSalvos);

    const inputNameTask = document.getElementById('task-name').value;
    const inputDescTask = document.getElementById('task-description').value;
    const idUsuario = dadosUser[0][0];

    const tasksData = {
        name: inputNameTask,
        description: inputDescTask,
        id_user: idUsuario
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/task_insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasksData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Cadastro realizado com sucesso!');
            limparFormularioCriacao();
            const checkboxToggle = document.getElementById('task-toggle');
            if (checkboxToggle) {
                checkboxToggle.checked = false;
            }
            const formTask = document.querySelector('.task-form');
            if (formTask) {
                formTask.classList.add('hidden-form');
            }
            const dadosSalvos = localStorage.getItem('dadosUsuario');
            const dadosUser = JSON.parse(dadosSalvos);
            const idUsuario = dadosUser[0][0];
            await carregarTasksDoUsuario(idUsuario);
        } else {
            alert('Ops! Erro ao cadastrar: ' + (result.erro || 'Verifique os dados'));
        }
    } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
    }
});