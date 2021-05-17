// Assigning the constants 
const fast = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

// Setting up the fast app
var app = fast();
var PORT = process.env.PORT || 3000;

// Linking to assets
app.use(fast.static('public'));

// Setting up data parsing
app.use(fast.urlencoded({extended: true});
app.use(fast.json());

// Page load to start with index, retrieve and listen
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Retrieve and post and delete the api endpoints
app.route("/api/notes")
// get the note list
.get(function (req, res) {
    res.json(database);
})
