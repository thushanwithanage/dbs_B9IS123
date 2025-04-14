# Back_end

This is a Node.js-based backend application that provides APIs for managing users and pets. It uses MongoDB as the database and includes features like user authentication, CRUD operations for users and pets, and email notifications.

## Features

- **User Management**: Create, read, update, and delete users.
- **Pet Management**: Create, read, update, and delete pets, along with pet type statistics.
- **Authentication**: Login functionality with validation middleware.
- **Email Notifications**: Sends email notifications when a pet is deleted.
- **Testing**: Includes unit tests for authentication routes using Jest and Supertest.


## Installation

1. Clone the repository:
    git clone https://github.com/thushanwithanage/dbs_B9IS123.git
    cd Back_end

2. Install dependencies:
   npm install

3. Create a .env file in the root directory with the following variables:
PORT=9000
MONGODB_CONNECTION_STRING=<your-mongodb-connection-string>
EMAIL_ADDRESS=<your-email-address>
ADMIN_EMAIL_ADDRESS=<admin-email-address>
PASSWORD=<your-email-password>
EMAIL_SERVICE=gmail

4. Start the server
   npm start
The server will run on http://localhost:9000.

## Dependencies

Express: Web framework for Node.js.
Mongoose: MongoDB object modeling tool.
Cors: Middleware for enabling CORS.
Nodemailer: For sending emails.
Jest: Testing framework.
Supertest: HTTP assertions for testing.

## Testing

npm test