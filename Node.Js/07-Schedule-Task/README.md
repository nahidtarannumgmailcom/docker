# Schedule-Task

## A simple task scheduling app built with Node.js, Express, and Docker.

### About
This project is a basic task scheduling app that allows users to create, read, update, and delete tasks. The app uses Node.js, Express, and Docker to provide a scalable and containerized solution.

### Files
- **server.js**: The Node.js server file that handles HTTP requests and responses.
- **package.json**: The package file that lists dependencies and scripts.
- **public/script.js**: The client-side JavaScript file that interacts with the server API.
- **Dockerfile**: The Dockerfile used to build the Docker image.

### Building and Running the Project
#### Step 1: Build the Docker Image
- Open a terminal and navigate to the project directory. Run the following command to build the Docker image:

```bash
docker build -t task-scheduler .
```
This will create a Docker image with the name **task-scheduler**.

#### Step 2: Run the Docker Container
- Run the following command to start a new container from the task-scheduler image:

```bash
docker run -p 3000:3000 --name task task-scheduler
```
This will start a new container and map port 3000 on the host machine to port 3000 in the container.

#### Step 3: Access the Application
- Open a web browser and navigate to [http://<Server's IP>:3000] to access the task scheduling app.

### API Endpoints
The app provides the following API endpoints:

- **GET /tasks**: Get all tasks
- **POST /tasks**: Create a new task
- **DELETE /tasks/:index**: Delete a task by index
- **PATCH /tasks/:index**: Update a task by index

### Client-Side Functionality
The client-side JavaScript file (`public/script.js`) provides the following functionality:

- Loads existing tasks from the server
- Handles form submission to create new tasks
- Handles task completion and deletion
- Toggles the theme between light and dark modes

### Note
This project uses a simple in-memory data store to store task information. In a real-world scenario, you would want to use a more robust data storage solution, such as a database.

