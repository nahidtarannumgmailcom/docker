// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Create 'tickets' directory if it doesn't exist
const ticketsDir = path.join(__dirname, 'tickets');
if (!fs.existsSync(ticketsDir)) {
  fs.mkdirSync(ticketsDir);
}

// Sample data for trains and fares
const trains = [
  'Train A', 'Train B', 'Train C', 'Train D', 'Train E',
  'Train F', 'Train G', 'Train H', 'Train I', 'Train J',
  'Train K', 'Train L', 'Train M', 'Train N', 'Train O',
  'Train P', 'Train Q', 'Train R', 'Train S', 'Train T'
];

const fares = {
  'Sleeper': 300,
  'AC 3 Tier': 800,
  'AC 2 Tier': 1200,
  'AC First Class': 2000
};

// Endpoint to get list of trains
app.get('/get-trains', (req, res) => {
  res.json(trains);
});

// Endpoint to get fare options
app.get('/get-fare', (req, res) => {
  res.json(fares);
});

// Store tickets
let tickets = [];

// Endpoint to book a ticket
app.post('/book-ticket', (req, res) => {
  const { name, email, trainName, departure, arrival, fare, ticketNo, travelDate } = req.body;

  if (!name || !email || !trainName || !departure || !arrival || !fare || !ticketNo || !travelDate) {
    console.error('All fields are required');
    return res.status(400).send('All fields are required');
  }

  if (departure === arrival) {
    console.error('Same station in Departure and Arrival can\'t be selected');
    return res.status(400).send('Same station in Departure and Arrival can\'t be selected');
  }

  const ticket = { name, email, trainName, departure, arrival, fare, ticketNo, travelDate };
  tickets.push(ticket);

  fs.writeFile(path.join(ticketsDir, `ticket-${ticketNo}.txt`), JSON.stringify(ticket, null, 2), (err) => {
    if (err) {
      console.error('Error booking ticket:', err);
      res.status(500).send('Error booking ticket');
    } else {
      console.log('Ticket booked successfully:', ticket);
      res.send('Ticket booked successfully!');
    }
  });
});

// Endpoint to get tickets
app.get('/get-tickets', (req, res) => {
  res.json(tickets);
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

