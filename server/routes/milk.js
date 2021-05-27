var express = require('express');
var router = express.Router();
// var db = require("../models/");
var state = [
    {
        name: "cocoa",
        description: "The deliciousness of the cocoa milk",
        price: "$1001",
        sellerAddress: "101 tolentino drive",
    }
]
router.get("/", function (req, res) {
    res.json(state);
})
router.get('/:name', function (req, res) {
    /* Returns specific orderbook for the post */
    var name = req.params.name;
    for (var i = 0; i < state.length; i++) {
        if (name == state[i].name) {
            res.json(state[i]);
            res.end();
        }
    }
    res.json({ res: null });
});
router.post("/", function (req, res) {
    var milk = {
        name: req.params.name,
        description: req.params.description,
        price: req.params.price,
        sellerAddress: req.params.address
    }
    state.append(milk);
    res.json({ res: "success" })
});


module.exports = router;