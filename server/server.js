// /api
// /api/notes

const express = require("express");
const api = require("./routes/api/api.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);