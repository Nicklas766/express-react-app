/**
 * Connect to the database with "mongodb" as route
 */
"use strict";

// MongoDB
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/people";
// Express server
const express = require("express");
var router = express.Router();

// Connect to database with mongoConnect
const db = require('../src/MongoConnect.js').mongoConnect(dsn, 'artists');


// Return a JSON object with list of all documents within the collection.
router.get("/get", async (req, res) => {
    try {
        var data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

// Create an object and return new list of objects
router.post("/insert", async (req, res) => {
    var item = {
        name: req.body.name,
        wikipedia: req.body.wikipedia,
        youtube: req.body.youtube
    };

    try {
        await db.insert(item);
        const data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

// Update an object in collection
router.post("/update", async (req, res) => {
    var item = {
        name: req.body.name,
        wikipedia: req.body.wikipedia,
        youtube: req.body.youtube
    };

    try {
        await db.update(req.body.id, item);
        const data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

// Delete an object in the collection and return new
router.post("/delete", async (req, res) => {
    try {
        await db.remove(req.body.id);
        const data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

// Delete an object in the collection and return new
router.get("/reset", async (req, res) => {
    try {
        const data = await db.reset();

        await db.close();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});




module.exports = router;
