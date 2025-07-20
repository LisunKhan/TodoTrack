document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('project-list');
    const createProjectForm = document.getElementById('create-project-form');

    async function fetchProjects() {
        const response = await fetch(`${API_URL}/projects/`, {
            headers: getAuthHeaders()
        });
        const projects = await response.json();
        projectList.innerHTML = '';
        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project.name;
            projectList.appendChild(li);
        });
    }

    if (createProjectForm) {
        createProjectForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const projectName = document.getElementById('project-name').value;
            const response = await fetch(`${API_URL}/projects/`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ name: projectName })
            });
            if (response.ok) {
                fetchProjects();
            } else {
                alert('Failed to create project');
            }
        });
    }

    fetchProjects();
});
