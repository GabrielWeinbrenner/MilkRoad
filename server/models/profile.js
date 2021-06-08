const mongoose = require("mongoose");
const milk = require("./models/milk");

module.exports = mongoose.model(
    "profile",
    new mongoose.Schema({
        name: String,
        milks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "milk",
            },
        ],
    })
);
