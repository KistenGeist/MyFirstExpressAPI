const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Initiating Creeper: http://localhost:${PORT}`)
);

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
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: "Catch me if you can!" })
    }

    res.send({
        identity: `Creeper with your ${logo} and ID of ${id}`
    });
});

app.get('/WhatAreYou', (req, res) => {
    //res.send( {fs: "../Creeper.png"});
    res.sendFile('C:/Users/wkusnezow/Documents/GitHub/MyFirstAPI/Creeper.png');
});