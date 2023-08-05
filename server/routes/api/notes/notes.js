const notes = require("express").Router();
const path = require("path");

notes.get("/", (req, res) => {

    // console.log(path.join(__dirname, "../../../../public/notes.html"));
    // res.sendFile(path.join(__dirname, "../../../../public/notes.html"));

});

module.exports = notes;