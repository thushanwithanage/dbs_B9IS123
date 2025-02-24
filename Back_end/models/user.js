const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;