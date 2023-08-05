const api = require("express").Router();

const notesRouter = require("./notes/notes.js");

api.use("/notes", notesRouter);

module.exports = api;