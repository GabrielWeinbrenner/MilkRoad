
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
var milkRoutes = require("./routes/milk");
// Access body request of posts
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function (req, res) {
    res.send("loaded");
})
app.use("/milk", milkRoutes);
app.listen(3001, function () {
    console.log("App run");
});