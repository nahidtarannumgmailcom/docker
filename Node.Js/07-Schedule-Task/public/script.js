document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const tableBody = document.querySelector('#tasks-table tbody');
    const themeButton = document.getElementById('toggle-theme');

    let darkTheme = false;

    // Load existing tasks
    const loadTasks = async () => {
        try {
            const response = await fetch('/tasks');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const tasks = await response.json();
                updateTable(tasks);
            } else {
                const text = await response.text(); // Get the response as text if it's not JSON
                console.error('Response is not JSON. Response text:', text);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Update table
    const updateTable = (tasks) => {
        tableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.issuedDate}</td>
                <td>${task.completionDate}</td>
                <td>${task.description}</td>
                <td><button class="complete" data-index="${index}">${task.completed ? 'Completed' : 'Complete'}</button></td>
                <td><button class="delete" data-index="${index}">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Handle form submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = {
            name: form['task-name'].value,
            issuedDate: form['task-issued-date'].value,
            completionDate: form['task-completion-date'].value,
            description: form['description'].value,
            completed: false
        };
        try {
            await fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            form.reset();
            loadTasks();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });

    // Handle task actions
    tableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('complete')) {
            const index = e.target.getAttribute('data-index');
            const completed = e.target.textContent === 'Complete';
            try {
                await fetch(`/tasks/${index}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed })
                });
                loadTasks();
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure to delete the task?')) {
                const index = e.target.getAttribute('data-index');
                try {
                    await fetch(`/tasks/${index}`, { method: 'DELETE' });
                    loadTasks();
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            }
        }
    });

    // Toggle theme
    themeButton.addEventListener('click', () => {
        darkTheme = !darkTheme;
        document.body.classList.toggle('dark-theme', darkTheme);
        themeButton.textContent = darkTheme ? '🌞' : '🌙';
    });

    // Initial load
    loadTasks();
});

