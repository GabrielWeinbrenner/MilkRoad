var express = require("express");
var router = express.Router();
require("dotenv").config();



var state = [
    {
        name: "choco",
        description: "asdfasfasfa",
        price: 102,
        sellerAddress: "5 tolen",
        color: "#ff0000",
    },
    {
        name: "chocolate milk",
        description: "asdfasfasfa",
        price: 102,
        sellerAddress: "5 tolen",
        color: "#0000ff",
    },
];
router.get("/", function (req, res) {
    res.json(state);
});
router.get("/:name", function (req, res) {
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
        sellerAddress: req.params.address,
        color: req.params.color,
    };
    state.append(milk);
    res.json({ res: "success" });
    
});

router.post("/splice", function(req,res){
    var milkOne = req.params.one;
    var milkTwo = req.params.two;


});

module.exports = router;
