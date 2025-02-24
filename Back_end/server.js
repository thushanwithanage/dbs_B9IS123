const express = require("express");
const cors = require("cors");

const app = express();

const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(cors(corsConfig));
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});