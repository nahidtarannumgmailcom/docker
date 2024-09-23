const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory task storage (temporary)
let tasks = [];

// Route to get all tasks
app.get('/tasks', (req, res) => {
    console.log('GET request received to fetch tasks'); // Log fetching tasks
    res.json(tasks); // Respond with the current tasks in JSON format
});

// Route to handle adding tasks
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    console.log('POST request received to add a task:', task); // Log task creation
    res.json(tasks); // Respond with updated tasks list in JSON format
});

// Route to handle deleting tasks
app.delete('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length) {
        const deletedTask = tasks.splice(index, 1);
        console.log(`DELETE request received. Task deleted:`, deletedTask[0]); // Log task deletion
        res.json(tasks); // Respond with updated tasks list in JSON format
    } else {
        console.log('DELETE request received for non-existing task'); // Log task not found
        res.status(404).send('Task not found');
    }
});

// Route to handle completing tasks
app.patch('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = req.body.completed;
        console.log(`PATCH request received. Task updated:`, tasks[index]); // Log task update (completion)
        res.json(tasks); // Respond with updated tasks list in JSON format
    } else {
        console.log('PATCH request received for non-existing task'); // Log task not found
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

