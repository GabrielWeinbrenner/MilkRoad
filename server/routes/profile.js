var express = require("express");
var router = express.Router();
require("dotenv").config();
var state = [
    {
        name: "Peaches",
        description: "Peaches and Cream",
        price: 102,
        sellerAddress: "5 tolen",
        color: "rgb(234, 179, 98)",
    },
    {
        name: "Grape Milk",
        description: "Grapes",
        price: 30,
        sellerAddress: "5 tolen",
        color: "#ff00ff",
    },
];

router.get("/", function (req, res) {
    res.json(state);
});
router.post("/", function(req,res){

})
module.exports = router;
