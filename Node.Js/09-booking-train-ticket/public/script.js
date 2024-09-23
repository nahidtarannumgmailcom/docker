// script.js
const themeToggle = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('light-icon');
const darkIcon = document.getElementById('dark-icon');
const bookTicketForm = document.getElementById('book-ticket-form');
const bookTicketBtn = document.getElementById('book-ticket-btn');
const ticketsContainer = document.getElementById('tickets-container');
const trainNameSelect = document.getElementById('trainName');
const fareSelect = document.getElementById('fare');
const travelDateInput = document.getElementById('travelDate');

let isDarkMode = false;

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark', isDarkMode);
  lightIcon.style.display = isDarkMode ? 'none' : 'block';
  darkIcon.style.display = isDarkMode ? 'block' : 'none';
});

fetch('/get-trains')
  .then(response => response.json())
  .then(trains => {
    trains.forEach(train => {
      const option = document.createElement('option');
      option.value = train;
      option.textContent = train;
      trainNameSelect.appendChild(option);
    });
  });

fetch('/get-fare')
  .then(response => response.json())
  .then(fares => {
    Object.keys(fares).forEach(fare => {
      const option = document.createElement('option');
      option.value = fares[fare];
      option.textContent = `${fare} - ₹${fares[fare]}`;
      fareSelect.appendChild(option);
    });
  });

bookTicketBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const trainName = document.getElementById('trainName').value;
  const departure = document.getElementById('departure').value;
  const arrival = document.getElementById('arrival').value;
  const travelDate = travelDateInput.value;
  const fareOption = fareSelect.options[fareSelect.selectedIndex];
  const fare = fareOption ? fareOption.value : 0; // Handle undefined fare

  if (departure === arrival) {
    alert('Same station in Departure and Arrival can\'t be selected');
    return;
  }

  const ticketNo = Math.random().toString(36).substr(2, 5).toUpperCase();

  fetch('/book-ticket', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, trainName, departure, arrival, fare, ticketNo, travelDate }),
  })
    .then(res => res.text())
    .then(message => {
      console.log(message);
      getTickets();
    })
    .catch(error => console.error('Error booking ticket:', error));
});

function getTickets() {
  fetch('/get-tickets')
    .then(response => response.json())
    .then(tickets => {
      ticketsContainer.innerHTML = tickets.map(ticket => `
        <div class="ticket">
          <h2>Ticket No: ${ticket.ticketNo}</h2>
          <p><strong>Name:</strong> ${ticket.name}</p>
          <p><strong>Email:</strong> ${ticket.email}</p>
          <p><strong>Train Name:</strong> ${ticket.trainName}</p>
          <p><strong>Departure:</strong> ${ticket.departure}</p>
          <p><strong>Arrival:</strong> ${ticket.arrival}</p>
          <p><strong>Fare:</strong> ₹${ticket.fare}</p>
          <p><strong>Date of Travel:</strong> ${ticket.travelDate}</p>
        </div>
      `).join('');
    });
}

// Initial call to populate tickets
getTickets();

