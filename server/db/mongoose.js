const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://gabe:user@cluster0.dtl9i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
);
