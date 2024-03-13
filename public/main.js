// This file contains the JavaScript code for the client-side of the application. It sends requests to the server to create, read, update, and delete events, and it displays the events on the page.
const eventForm = document.getElementById('eventForm');
const updateForm = document.getElementById('updateForm');
const eventsList = document.getElementById('eventsList');

eventForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(eventForm);
  const eventData = {};
  
  formData.forEach((value, key) => {
    eventData[key] = value;
  });

  fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })
  .then(response => response.json())
  .then(newEvent => {
    // Clear the form
    eventForm.reset();
    
    // Fetch and display all events
    fetchEvents();
  })
  .catch(error => console.error('Error:', error));
});

updateForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const id = document.getElementById('updateId').value;
  const title = document.getElementById('updateTitle').value;
  const date = document.getElementById('updateDate').value;
  const location = document.getElementById('updateLocation').value;
  const description = document.getElementById('updateDescription').value;

  fetch(`http://localhost:3000/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, date, location, description }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(updatedEvent => {
        updateForm.style.display = 'none';
        fetchEvents();
      })
      .catch(error => console.error('Error:', error));
    });

    function fetchEvents() {
      fetch('http://localhost:3000/events')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(events => displayEvents(events))
        .catch(error => console.error('Error:', error));
    }

function displayEvents(events) {
    eventsList.innerHTML = '';

    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');

        eventDiv.innerHTML = `
            <p><strong>Title:</strong> ${event.title}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Description:</strong> ${event.description}</p>
        `;

        // Only create and append the update and delete buttons if the event is not the default event
        if (event.title !== 'Graduation Party') {
            const updateBtn = document.createElement('button');
            updateBtn.classList.add('update-btn');
            updateBtn.innerText = 'Update';
            updateBtn.addEventListener('click', () => updateEvent(event));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                console.log(`Delete button clicked for event with ID: ${event.id}`);
                deleteEvent(event.id);
            });

            eventDiv.appendChild(updateBtn);
            eventDiv.appendChild(deleteBtn);
        }

        eventsList.appendChild(eventDiv);
    });
}



function updateEvent(event) {
  document.getElementById('updateId').value = event.id;
  document.getElementById('updateTitle').value = event.title;
  document.getElementById('updateDate').value = event.date;
  document.getElementById('updateLocation').value = event.location;
  document.getElementById('updateDescription').value = event.description;
  updateForm.style.display = 'block';
}

function deleteEvent(eventId) {
    // Directly send a DELETE request to the server with the event ID
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: 'DELETE',
    })
    .then(() => fetchEvents()) // Fetch updated events after deletion
    .catch(error => console.error('Error:', error));
  }

// Initial fetch of events
fetchEvents();
