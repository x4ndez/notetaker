const notes = require("express").Router();
const path = require("path");
const fs = require("fs/promises");

const dbPath = path.join(__dirname, "../../../../server/db/db.json");

let idArray = [];

// GET

notes.get("/", async (req, res) => {

    const dbRead = await readFile(dbPath);
    res.json(dbRead);

});

// POST

notes.post("/", (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {

            title: title,
            text: text,
            id: createId(),

        }

        readAndAppend(newNote);

        const response = {

            status: "success",
            body: req.body,

        };

        res.json(response);

    } else {

        res.json("Error in POST request.");

    }

});

// DELETE

notes.delete("/:id", async (req, res) => {

    const dbReadObj = await readFile(dbPath);

    // create a new database object without the note to be deleted
    let updatedDb = dbReadObj.filter((val, i, arr) => {

        if (arr[i].id != req.params.id) return true;

    });

    // Save updated database object to database
    const dbWrite = await fs.writeFile(dbPath, JSON.stringify(updatedDb));

    // send response 200
    res.status(200).send("Note deleted successfully.");


});

async function readAndAppend(newNote) {

    const dbReadObj = await readFile(dbPath);

    // Add new note to database object
    dbReadObj.push(newNote);

    // Save updated database object to database
    const dbWrite = await fs.writeFile(dbPath, JSON.stringify(dbReadObj));

}

async function readFile(file) {

    //Read Database
    const dbRead = await fs.readFile(file, "utf8");

    // Convert Database from string to object
    const dbReadObj = JSON.parse(dbRead);

    return dbReadObj;

}

function idRoll() {

    let id = [];

    for (let i = 0; i < 9; i++) {

        id.push(Math.floor(Math.random() * 10));

    }

    return id;

}

function checkId(id) {

    let idCheck = 0;

    for (const idArrItem of idArray) {

        for (let i = 0; i < id.length; i++) {

            if (id[i] === idArrItem[i]) idCheck++;

        }

    }

    if (idCheck === 9) return null;
    else {

        return id.join("");

    }

}

function createId() {

    //create 9 digit id number
    const id = idRoll();
    //check if any item in the array has the same number
    const checkedId = checkId(id);
    //if the checked id has the same id as a number in the array, create a new id until the id is unique
    while (checkedId === null) {

        checkedId = checkId(id);

    }

    return checkedId;

}

module.exports = notes;