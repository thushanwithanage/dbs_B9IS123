const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    petname: {
        type: String
    },
    petdescription: {
        type: String
    },
    pettype: {
        type: String
    }
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;