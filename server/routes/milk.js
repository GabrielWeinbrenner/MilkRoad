var express = require("express");
var router = express.Router();
// var db = require("../models/");
var state = [];
router.get("/", function (req, res) {
    res.json(state);
});
router.get("/:name", function (req, res) {
    var name = req.params.name;
    var found = false;
    for (var i = 0; i < state.length; i++) {
        if (name == state[i].name) {
            res.json(state[i]);
            res.end();
            found = true;
            break;
        }
    }
    found == false ? res.json(null) : "";
});
router.post("/", function (req, res) {
    var milk = req.body;
    state.push(milk);
    console.log(state);
    res.json({ res: "success" });
});

module.exports = router;
