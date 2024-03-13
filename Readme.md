# Event Management App

## About the App
The Event Management App is a simple yet powerful application built using Node.js and Express.js. It facilitates the management of events, allowing users to perform basic CRUD (Create, Read, Update, Delete) operations. Each event is defined by a unique ID, title, date, location, and description. The application stores event data in a JSON file, ensuring ease of management and flexibility.

## Application Structure

### `app.js`

This is the main entry point of the application. It sets up my Express server, applies any middlewares that the application uses (like `body-parser` and `express-validator`), and mounts my routers.

### `routes/events.js`

This file contains the routing logic for the application. It defines the following routes:

- `GET /`: Fetch all events.
- `POST /`: Create a new event.
- `GET /:id`: Fetch a specific event by ID.
- `PUT /:id`: Update a specific event by ID.
- `DELETE /:id`: Delete a specific event by ID.

Each route is associated with a handler function that is defined in `controllers/eventsController.js`.

### `controllers/eventsController.js`

This file contains the controller logic for my application. It exports functions that handle requests for creating, reading, updating, and deleting events. These functions are used as middleware in the routes.

### `views/index.ejs`

This file is the main view of my application. It is rendered by Express when a client makes a GET request to the root path (`/`). It uses the EJS templating language to generate HTML based on the events data passed to it.

### `public/styles.css`

This file contains the CSS styles for the application. It is served as a static file by Express.

### `public/main.js`

This file contains javascript codes for the application. It is served as a static file by Express.

### `public/pictures/congrats.jpg`

Lovely cat photo



## How to Run the App Locally

1. Clone the repository to your local machine using `git clone <repository_url>`.
2. Navigate to the project directory using `cd <project_directory>`.
3. Install the necessary dependencies using `npm install`.
4. Start the server using `npm start`.
5. The application will be running at `http://localhost:3000`.

## Application Dependencies

`express`: A web application framework for Node.js, used to build the web server.
`body-parser`: Middleware to parse the body of incoming HTTP requests, allowing the application to read JSON data.
`fs`: A built-in Node.js module used to work with the file system. It enables the application to read and write event data to a JSON file.
`express-validator`: A set of middleware for `express.js` that validates and sanitizes strings, ensuring data integrity.
For detailed information about the versions of these dependencies, please refer to the  `package.json` file within the project directory.
