# Task-Scheduling-App_REST-API

A simple task scheduling app built with Node.js, Express, and Docker.

## About
This project is a basic task scheduling app that allows users to create, read, update, and delete tasks. The app uses Node.js, Express, and Docker to provide a scalable and containerized solution.

## Files
- `server.js`: The Node.js server file that handles HTTP requests and responses.
- `package.json`: The package file that lists dependencies and scripts.
- `Dockerfile`: The Dockerfile used to build the Docker image.

## Building and Running the Project

### Step 1: Build the Docker Image
- Open a terminal and navigate to the project directory. Run the following command to build the Docker image:

```bash
docker build -t task-scheduler .
```

This will create a Docker image with the name `task-scheduler`.

### Step 2: Run the Docker Container
- Run the following command to start a new container from the `task-scheduler` image:

```bash
docker run -p 4000:4000 --name task task-scheduler
```
This will start a new container and map port 4000 on the host machine to port 4000 in the container.

### Step 3: Access the Application using Postman
- Open Postman and create a new request to `http://<Server's IP>:4000`. You can use the following commands to interact with the app:

#### **POST /task**
Create a new task:

- **Method**: POST
- **URL**: `http://<Server's IP>:4000/task`
- **Body**: JSON object with `name`, `schedule`, and `description` properties

##### Example:

```json
{
  "name": "Task 1",
  "schedule": 3000,
  "description": "This is task 1"
}
```

<img width="642" alt="Screenshot (3621)" src="https://github.com/user-attachments/assets/bf4cd39c-15ee-4db4-a663-122940dcc50d">


#### **Response**: 201 Created with the created task object

#### **GET /tasks**
Get all tasks:

- **Method**: GET
- **URL**: `http://<Server's IP>:4000/tasks`
- **Response**: JSON array of task objects

<img width="644" alt="Screenshot (3623)" src="https://github.com/user-attachments/assets/051f7594-a7b7-4410-8495-eb8518c93b28">

#### **GET /task/:id**
Get a task by ID:

- **Method**: GET
- **URL**: `http://<Server's IP>:4000/task/:id`
- **Path variable**: `id` (e.g. 1)
- **Response**: JSON object of the task with the specified ID

<img width="650" alt="Screenshot (3624)" src="https://github.com/user-attachments/assets/e8f5f4ef-771b-4550-997b-d2a7255e7e5d">


#### **PUT /task/:id**
Update a task:

- **Method**: PUT
- **URL**: `http://<Server's IP>:4000/task/:id`
- **Path variable**: `id` (e.g. 1)
- **Body**: JSON object with updated `name`, `schedule`, and `description` properties

##### Example:

```json
{
  "name": "Task 1 updated",
  "schedule": 3000,
  "description": "This is task 1 updated"
}
```
### **DELETE /task/:id**
Delete a task:

- **Method**: DELETE
- **URL**: `http://<Server's IP>:4000/task/:id`
- **Path variable**: `id` (e.g. 1)
- **Response**: 200 OK with the deleted task object

<img width="647" alt="Screenshot (3625)" src="https://github.com/user-attachments/assets/f6b24fa4-10f8-4fe5-bbc7-3c313b6cf941">


**Note**  
This project uses a simple in-memory data store to store task information. In a real-world scenario, you would want to use a more robust data storage solution, such as a database (e.g., MongoDB, PostgreSQL, or MySQL) to persist task data across server restarts and support scalability.

