var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
var milkRoutes = require("./routes/milk");
var profileRoutes = require("./routes/profile");
var cors = require("cors");
app.use(cors());
require("./db/mongoose");

// Access body request of posts
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("loaded");
});
app.use("/milk", milkRoutes);

app.use("/profile", profileRoutes);

app.listen(3001, function () {
    console.log("App run");
});
