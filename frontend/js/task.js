document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const createTaskForm = document.getElementById('create-task-form');

    async function fetchTasks() {
        const response = await fetch(`${API_URL}/tasks/`, {
            headers: getAuthHeaders()
        });
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} (Project: ${task.project})`;
            taskList.appendChild(li);
        });
    }

    if (createTaskForm) {
        createTaskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('task-title').value;
            const project = document.getElementById('task-project').value;
            const response = await fetch(`${API_URL}/tasks/`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ title, project })
            });
            if (response.ok) {
                fetchTasks();
            } else {
                alert('Failed to create task');
            }
        });
    }

    fetchTasks();
});
