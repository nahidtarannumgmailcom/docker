# Booking Train Ticket
A simple train ticket booking system built with Node.js, Express, and Docker.

## About
This project is a basic train ticket booking system that allows users to book tickets, view available trains and fares, and retrieve booked tickets. The app uses Node.js, Express, and Docker to provide a scalable and containerized solution.

## Files
- **`server.js`**: The Node.js server file that handles HTTP requests and responses.
- **`package.json`**: The package file that lists dependencies and scripts.
- **`public/script.js`**: The client-side JavaScript file that interacts with the server API.
- **`Dockerfile`**: The Dockerfile used to build the Docker image.

## Building and Running the Project
### Step 1: Build the Docker Image
- Open a terminal and navigate to the project directory. Run the following command to build the Docker image:

```bash
docker build -t train-ticket-booking .
```
This will create a Docker image with the name **`train-ticket-booking`**.

### Step 2: Run the Docker Container
- Run the following command to start a new container from the **`train-ticket-booking`** image:

```bash
docker run -p 3000:3000 --name train train-ticket-booking
```
This will start a new container and map port 3000 on the host machine to port 3000 in the container.

### Step 3: Access the Application
- Open a web browser and navigate to [http://<Server's IP>:3000] to access the train ticket booking system.

### Features
- Book tickets with train name, departure, arrival, fare, and travel date
- View available trains and fares
- Retrieve booked tickets
- Store tickets in a file-based system
- Dockerized for easy deployment and scaling

### API Endpoints
The app provides the following API endpoints:

- **`GET /get-trains`**: Get a list of available trains
- **`GET /get-fare`**: Get a list of available fares
- **`POST /book-ticket`**: Book a ticket
- **`GET /get-tickets`**: Retrieve booked tickets

### Note
This project uses a simple file-based data store to store ticket information. In a real-world scenario, you would want to use a more robust data storage solution, such as a database.

