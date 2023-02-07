# Read Books Online (RBO)


A CRUD application to manage purchase requests and employees featuring ticket status tracking, email notifications, and real-time chat.

It's built with a full JavaScript stack: MongoDB and Mongoose for persistence; Node, Express, and bcrypt in the backend; HTML, CSS, React, and Socket.io in the frontend; and Chai, and Mocha for testing.
                
## /packages Structure

Source code for the application

### /core

Functionality available to all other projects:

- CQRS implementation
- Utility functions
- Unit tests

### /backend

- API and socket endpoints for frontend
- Authentication
- Authorization
- Validation
- Database management
- Application logic
- Error handling
- Unit & integration tests

### /client

Middleman between the /backend and /frontend:

- Shared data models (DTOs, CQRS requests)
- Type definition for backend API endpoints
- Javascript Proxy provider for the API type definition
- Unit tests

### /frontend

Single-page application served as a website:

- Routing
- Authentication
- Authorization
- Validation
- Application logic
- Error handling
- End-to-end tests
