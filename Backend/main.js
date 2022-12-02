const express = require('express');
const app = express();
const cors = require("cors");
const Logger = require("./Logger.js");
var nconf = require("nconf");
let port = 3000;

// Node Logger
const logger = new Logger();

app.use(express.json());
//Cors
app.use(cors());

//#region setup config
// First consider commandline arguments and environment variables, respectively.
nconf.argv().env();

// Then load configuration from a designated file.
console.log(__dirname+ "\\config.json");
nconf.file({
    file: __dirname + "\\config.json"
});
//console.log(nconf);
//#endregion

port = nconf.get("MyFirstExpressAPI:port");

//#region requests
app.get("/", (req, res) => {
    res.send({
        author: nconf.get("MyFirstExpressAPI:author"),
        version: nconf.get("MyFirstExpressAPI:version"),
        documentation: nconf.get("MyFirstExpressAPI:documentation"),
        enviroment: nconf.get("MyFirstExpressAPI:enviroment"),
        "openapi-version": "3.0.0",
        title: "My First Express API",
        description: "This is a API for testing",
    });
})

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
        res.send({ error: err });
    }
});
//#endregion

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    logger.Log("Server started.");
});

