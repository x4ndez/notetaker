// /api
// /api/notes

const express = require("express");
const path = require("path");
const api = require("./server/routes/api/api.js");

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

// GET Notes page
app.get("/notes", (req, res) => {

    console.log(`${req.method}, ${req.ip}, ${req.path}`);
    res.sendFile(path.join(__dirname, "/public/notes.html"));


});

// GET Homepage
app.get("*", (req, res) => {

    console.log(`${req.method}, ${req.ip}, ${req.path}`);
    res.sendFile(path.join(__dirname, "/public/index.html"));


});

app.use(express.static("public"));

app.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`);

});