### Feedback-App
A simple Node.js application that allows users to provide feedback, which is then stored in a file-based system. The app uses Docker to provide a scalable and containerized solution.

### About
This project is a basic feedback system that allows users to submit feedback, which is then stored in a file-based system. The app uses Node.js, Express, and Docker to provide a scalable and containerized solution.

### Files
- **`server.js`**: The Node.js server file that handles HTTP requests and responses.
- **`package.json`**: The package file that lists dependencies and scripts.
- **`Dockerfile`**: The Dockerfile used to build the Docker image.

### Building and Running the Project
#### Step 1: Build the Docker Image
- Open a terminal and navigate to the project directory. Run the following command to build the Docker image:

```bash
docker build -t feedback-app .
```
This will create a Docker image with the name `feedback-app`.

### Step 2: Run the Docker Container
- Run the following command to start a new container from the `feedback-app` image:

```bash
docker run -p 80:80 --name feed feedback-app
```
This will start a new container and map port 80 on the host machine to port 80 in the container.

### Step 3: Access the Application
- Open a web browser and navigate to `[http://<Server's IP>:80]` to access the feedback app.

### Features
- Submit feedback with a title and content
- Feedback is stored in a file-based system
- Dockerized for easy deployment and scaling

### How it Works
The app uses two directories: `temp` and `feedback`. When a user submits feedback, the app writes the feedback to a temporary file in the `temp` directory. If the file already exists in the `feedback` directory, the app redirects the user to an "exists" page. Otherwise, the app renames the temporary file to a permanent file in the `feedback` directory.

### Note
This project uses a simple file-based data store to store feedback. In a real-world scenario, you would want to use a more robust data storage solution, such as a database.

