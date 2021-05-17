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

