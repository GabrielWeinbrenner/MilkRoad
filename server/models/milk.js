const mongoose = require("mongoose");

module.exports = mongoose.model(
    "milk",
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        sellerAddress: String,
        color: String,
        author: {
            id: mongoose.Schema.Types.ObjectId,
            ref: "profile",
        },
    })
);
