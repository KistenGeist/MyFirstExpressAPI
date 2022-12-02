const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");
const cors = require("cors");

//Helmet security
app.use(helmet());
app.use(express.static("public"));
app.use(express.json())
//Cors
app.use(cors());
app.listen(port);

// Add headers before the routes are defined
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Pass to next layer of middleware
    next();
});

app.all("/app/*", function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile("./public/app/index.html", {
      root: __dirname,
    });
  });

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
    //res.sendFile('C:/Users/wkusnezow/Documents/GitHub/MyFirstAPI/Creeper.png');
});

/**
 * Server create
 */

/*
https.createServer(
    {
        key: fs.readFileSync("./ssl/key.pem"),
        cert: fs.readFileSync("./ssl/cert.pem")
        //,passphrase: "d§$Fsdftr34rwefefdegfdwf", 
    }
    ,app
).listen(port);
*/
