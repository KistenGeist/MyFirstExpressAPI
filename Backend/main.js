const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
const Logger = require("./Logger.js");

// Node Logger
const logger = new Logger();

app.use(express.json());
//Cors
app.use(cors());

app.get('/identity', (req, res) => {
    res.status(200).send({
        beeing: 'Creeper',
        purpose: 'Catch me!'

    })
});

app.post('/identity/:id', (req, res) => {
    //Get params of API call
    const { id } = req.params;

    //Get body (in JSON, for that see line 1-5) of API call
    const { logo } = req.body !== null ? req.body : {};

    if (!logo) {
        res.status(418).send({ error: "Catch me if you can!" })
    }

    res.send({
        identity: `Creeper with your ${logo} and ID of ${id}`
    });
});

app.get('/WhatAreYou', (req, res) => {
    //res.send( {fs: "../Creeper.png"});
    try {
        
    }
    catch (err) {
        res.send({error: err});
    }
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    logger.Log("Server started.");
});

