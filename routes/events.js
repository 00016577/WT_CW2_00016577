// Initialize express router
const express = require('express');
const fs = require('fs'); 
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Read events from JSON file
function readEvents() {
  const data = fs.readFileSync('./events.json');
  return JSON.parse(data);
}

// Write events to JSON file
function writeEvents(events) {
  const data = JSON.stringify(events, null, 2);
  fs.writeFileSync('./events.json', data);
}

// Get all events
router.get('/', (req, res) => {
  const events = readEvents();
  res.json(events);
});

// Create a new event
router.post('/', (req, res) => {
  const events = readEvents();
  const newEvent = req.body;
  newEvent.id = Date.now(); // Add a unique ID
  events.push(newEvent);
  writeEvents(events);
  res.json(newEvent);
});

// Get an event by ID
router.get('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(event);
});

// Update an event by ID
router.put(
  '/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('date').notEmpty().isISO8601().withMessage('Invalid date format'),
    body('location').notEmpty().withMessage('Location is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventId = parseInt(req.params.id);
    const events = readEvents();
    const index = events.findIndex((e) => e.id === eventId);

    if (index === -1) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      const updatedEvent = { ...events[index], ...req.body, id: eventId };
      events[index] = updatedEvent;
      writeEvents(events);
      res.json(updatedEvent);
    }
  }
);

// Delete an event by ID
router.delete('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const events = readEvents();
  const eventIndex = events.findIndex((e) => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events.splice(eventIndex, 1);
  writeEvents(events);

  res.json({ message: 'Event deleted' });
});
// Delete an event

router.delete('/:id', (req, res) => {
  const events = readEvents();
  const id = Number(req.params.id);
  const event = events.find(event => event.id === id);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const newEvents = events.filter(event => event.id !== id);
  writeEvents(newEvents);
  res.json({ id });
});
module.exports = router;

