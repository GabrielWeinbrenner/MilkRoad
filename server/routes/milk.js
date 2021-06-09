var express = require("express");
var router = express.Router();
require("dotenv").config();
const Milk = require("../models/milk.js");
var blend_colors = import("../utils/blend.js");
router.get("/", async function (req, res) {
    try {
        const milks = await Milk.find({});
        res.send(milks);
    } catch (e) {
        res.status(500).send();
    }
});
router.get("/:name", async function (req, res) {
    try {
        const milk = await Milk.findOne(
            { name: req.params.name },
            async (err, data) => {
                if (!data) return;
                return data;
            }
        );
        res.send(milk);
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/", async function (req, res) {
    const milk = new Milk(req.body);
    try {
        await milk.save();
        res.status(201).send({ milk });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/splice", function (req, res) {
    var milkOne = req.params.one;
    var milkTwo = req.params.two;
    var finalColor = blend_colors(milkOne.color, milkTwo.color);
    console.log(finalColor);
});

module.exports = router;
