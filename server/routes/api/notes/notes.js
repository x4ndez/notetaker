const notes = require("express").Router();
const path = require("path");
const fs = require("fs/promises");

const dbPath = path.join(__dirname, "../../../../server/db/db.json");

//path.join(__dirname, "../../../../server/db/db.json")

notes.get("/", async (req, res) => {

    const dbRead = await readFile(dbPath);

    res.json(dbRead);

});

notes.post("/", (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

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

    const dbReadObj = await readFile(dbPath);

    // Add new note to database object
    dbReadObj.push(newNote);

    // Save updated database to database
    const dbWrite = await fs.writeFile(dbPath, JSON.stringify(dbReadObj));

}

async function readFile(file) {

    //Read Database
    const dbRead = await fs.readFile(file, "utf8");

    // Convert Database from string to object
    const dbReadObj = JSON.parse(dbRead);

    return dbReadObj;

}

module.exports = notes;