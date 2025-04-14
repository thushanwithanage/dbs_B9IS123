# Back_end

This is a Node.js-based backend application that provides APIs for managing users and pets. It uses MongoDB as the database and includes features like user authentication, CRUD operations for users and pets, and email notifications.

---

## Features

- **User Management**: Create, read, update, and delete users.
- **Pet Management**: Create, read, update, and delete pets, along with pet type statistics.
- **Authentication**: Login functionality with validation middleware.
- **Email Notifications**: Sends email notifications when a pet is deleted.
- **Testing**: Includes unit tests for authentication routes using Jest and Supertest.

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/thushanwithanage/dbs_B9IS123.git
cd Back_end
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a .env file in the root directory with the following variables:
```bash
PORT=9000
MONGODB_CONNECTION_STRING=<your-mongodb-connection-string>
EMAIL_ADDRESS=<your-email-address>
ADMIN_EMAIL_ADDRESS=<admin-email-address>
PASSWORD=<your-email-password>
EMAIL_SERVICE=gmail
```

### 4. Start the server
```bash
npm start
```
The server will run on: http://localhost:9000


### 5. Dependencies
- **Express** – Web framework for Node.js
- **Mongoose** – MongoDB object modeling tool
- **Cors** – Middleware for enabling CORS
- **Nodemailer** – For sending emails
- **Jest** – JavaScript testing framework
- **Supertest** – HTTP assertions for testing


### 6. Testing
```bash
npm test
```