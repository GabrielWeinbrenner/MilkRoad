var express = require("express");
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
    console.log(fileContent);
    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileContent,
    };
    s3.upload(params, function (err, data) {
        console.log(data);
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
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
    tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
        if (err) throw err;
        console.log("File: ", path);
        console.log("Filedescriptor: ", fd);
        state.push(milk);
        json = JSON.stringify(milk);
        fs.writeFileSync("./foo.json", json);
        uploadFile("foo.json", milk.name);
        console.log(state);
        res.json({ res: "success" });

        cleanupCallback();
    });
});

module.exports = router;
