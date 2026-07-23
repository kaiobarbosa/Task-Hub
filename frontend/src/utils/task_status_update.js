document.addEventListener('DOMContentLoaded', () => {
  const taskItems = document.querySelectorAll('.task-item');

  taskItems.forEach((item) => {
    const checkbox = item.querySelector('.task-checkbox');
    const status = item.querySelector('.task-status');

    const updateStatus = () => {
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
    };

    checkbox.addEventListener('change', updateStatus);
    updateStatus();
  });
});
