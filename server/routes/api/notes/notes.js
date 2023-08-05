const notes = require("express").Router();
const path = require("path");
const fs = require("fs/promises");

const dbPath = path.join(__dirname, "../../../../server/db/db.json");

//path.join(__dirname, "../../../../server/db/db.json")

notes.get("/", (req, res) => {

    console.log("req received");
    res.sendFile(dbPath);

});

notes.post("/", (req, res) => {

    const { title, text } = req.body;

    if (title && body) {

        readAndAppend(req.body);

        const response = {

            status: "success",
            body: req.body,

        };

        res.json(response);

    } else {

        res.json("Error in POST request.");

    }



});

async function readAndAppend(newNote) {

    //Read Database
    const dbRead = await fs.readFile(dbPath, "utf8");

    // Convert Database from string to object
    dbReadObj = JSON.parse(dbRead);

    // Add new note to database object
    dbReadObj.push(newNote);

    // Save updated database to database
    const dbWrite = await fs.writeFile(dbPath, JSON.stringify(dbReadObj));

}

module.exports = notes;