require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const corsConfig = {
    credentials: true,
    origin: true,
};

const user = require("./routes/user");
const auth = require("./routes/auth");
const pet = require("./routes/pet");

app.use(cors(corsConfig));
app.use(express.json());

app.use("/user", user);
app.use("/auth", auth);
app.use("/pet", pet);

const port = process.env.PORT || 9000;

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => console.error("MongoDB connection error:", err));

// Export the app for testing (optional)
module.exports = app;

// Start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
    app.listen(port, '0.0.0.0', () => {
        console.log("Server is listening on port " + port);
    });
}