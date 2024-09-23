const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Load tasks from file if it exists
let tasks = [];
if (fs.existsSync(TASKS_FILE)) {
    const data = fs.readFileSync(TASKS_FILE);
    tasks = JSON.parse(data);
}

// Save tasks to the file
const saveTasksToFile = () => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Route to get all tasks
app.get('/tasks', (req, res) => {
    console.log('GET request received to fetch tasks');
    res.json(tasks); // Respond with the current tasks in JSON format
});

// Route to handle adding tasks
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    saveTasksToFile(); // Save the updated tasks to the file
    console.log('POST request received to add a task:', task);
    res.json(tasks); // Respond with updated tasks list in JSON format
});

// Route to handle deleting tasks
app.delete('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length) {
        const deletedTask = tasks.splice(index, 1);
        saveTasksToFile(); // Save the updated tasks to the file
        console.log(`DELETE request received. Task deleted:`, deletedTask[0]);
        res.json(tasks); // Respond with updated tasks list in JSON format
    } else {
        console.log('DELETE request received for non-existing task');
        res.status(404).send('Task not found');
    }
});

// Route to handle completing tasks
app.patch('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = req.body.completed;
        saveTasksToFile(); // Save the updated tasks to the file
        console.log(`PATCH request received. Task updated:`, tasks[index]);
        res.json(tasks); // Respond with updated tasks list in JSON format
    } else {
        console.log('PATCH request received for non-existing task');
        res.status(404).send('Task not found');
    }
});

// Serve index.html for any other request that isn't an API call
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

