const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

const user = require("./routes/user");
const auth = require("./routes/auth");
const pet = require("./routes/pet");

const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use("/user", user);
app.use("/auth", auth);
app.use("/pet", pet);

const port = 9000;

mongoose
    .connect("mongodb+srv://thushan:ugPVYNkBqIVgaz7R@cluster0.wt20z.mongodb.net/db_20058324?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log("Listening on port " + port);
});