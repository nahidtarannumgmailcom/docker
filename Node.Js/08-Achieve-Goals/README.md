# Achieve-Goals
A simple goal-achieving application built with Node.js, Express, and Docker.

## About
This project is a basic goal-achieving app that allows users to create, read, update, and delete tasks. The app uses Node.js, Express, and Docker to provide a scalable and containerized solution.

## Files
- **`server.js`**: The Node.js server file that handles HTTP requests and responses.
- **`package.json`**: The package file that lists dependencies and scripts.
- **`public/script.js`**: The client-side JavaScript file that interacts with the server API.
- **`Dockerfile`**: The Dockerfile used to build the Docker image.

## Building and Running the Project
### Step 1: Build the Docker Image
- Open a terminal and navigate to the project directory. Run the following command to build the Docker image:

```bash
docker build -t achieve-goals .
```
This will create a Docker image with the name `achieve-goals`.

### Step 2: Run the Docker Container
Run the following command to start a new container from the `achieve-goals` image:

```bash
docker run -p 3000:3000 --name goals achieve-goals
```
This will start a new container and map port 3000 on the host machine to port 3000 in the container.

### Step 3: Access the Application
- Open a web browser and navigate to [http://<Server's IP>:3000] to access the goal-achieving app.

### Features
- Create, read, update, and delete tasks
- Tasks are saved to a file `tasks.json` inside the container
- Automatic creation of `tasks.json` file if it doesn't exist
- Client-side JavaScript file interacts with the server API to perform CRUD operations

### API Endpoints
The app provides the following API endpoints:
- **GET /tasks**: Get all tasks
- **POST /tasks**: Create a new task
- **DELETE /tasks/:index**: Delete a task by index
- **PATCH /tasks/:index**: Update a task by index

### Note
This project uses a simple file-based data store to store task information. In a real-world scenario, you would want to use a more robust data storage solution, such as a database.

