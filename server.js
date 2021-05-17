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
//  add a new note
.post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;
    // test note written on original note
    let highestID = 99;
    // loop through the array to find highest ID
    for (let i = 0; i < database.length; i++) {
        let individualNote = database[i];

        if (individualNote.id > highestID) {
            // highestID is the highest numbered ID
            highestID = individualNote.id;
        }
    }
    // assigning an ID to the new note
    newNote.id = highestID + 1;
    // pushing to db.json
    database.push(newNote)
    // again writing the db.json file
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Your note was saved!");
    });
    // returns a new note response
    res.json(newNote);
    });
