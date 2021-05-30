var express = require('express');
var router = express.Router();
require("dotenv").config();

const fs = require("fs");
const tmp = require("tmp");
const AWS = require("aws-sdk");
const ID = process.env.id;
const SECRET = process.env.secret;
const BUCKET_NAME = "milkroad";
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});
const uploadFile = (fileName, key) => {
    const fileContent = fs.readFileSync(fileName);
    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileContent,
    };
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        return data.location;
    });
};
var state = [
    {
        name: "choco",
        description: "asdfasfasfa",
        price: 102,
        sellerAddress: "5 tolen",
    },
];
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
    var milk = req.body;
    tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
        if (err) throw err;
        console.log("File: ", path);
        console.log("Filedescriptor: ", fd);
        state.push(milk);
        json = JSON.stringify(milk);
        fs.writeFileSync("./foo.json", json);
        let url = uploadFile("foo.json", milk.name);

        res.json({ res: url });

        cleanupCallback();
    });
});


module.exports = router;