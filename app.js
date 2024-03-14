// app.js
const express = require('express');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/events');
const app = express();
const PORT = 80;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON file
app.use(bodyParser.json());

// Routes
app.use('/events', eventsRouter);



// Root route
app.get('/', (req, res) => {
  // Render the EJS template
  res.render('index', { showCongratsMessage: true }); 
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
