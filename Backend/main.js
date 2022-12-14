const express = require('express');
const app = express();
const cors = require("cors");
const Logger = require("./Logger.js");
const fs = require("fs");
var nconf = require("nconf");
let port = 3000;

// Node Logger
const logger = new Logger();

app.use(express.json());
//Cors
app.use(cors());

//#region reposiories
const HaustierRepository = require("./Repositories/HaustierRepository.js");
const haustier = new HaustierRepository();

//#endregion

//#region video
//const videoPath = '\\images\\TestVideo.mp4'
//const videoSize = fs.statSync('TestVideo.mp4').size;
//#endregion

//#region setup config
// First consider commandline arguments and environment variables, respectively.
nconf.argv().env();

// Then load configuration from a designated file.

nconf.file({
    file: __dirname + "\\config.json"
});

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

app.get('/GetHaustiere', async (req, res) => {
    const allAnimals = await haustier.GetHaustierData();
    let response = {
        Info: "Hier sind alle Tiere glücklich beisammen :).",
        Tiere: {}
    };
    console.log(allAnimals);
    await allAnimals.forEach((animal) => {
        if (!response["Tiere"][animal.ID]) {
            response["Tiere"][animal.ID] = {};
        }

        response["Tiere"][animal.ID] = {
            Tierart: animal.Tierart,
            Name: animal.Name,
            Alter: animal.AlterInJahren
        };
    });
    res.send(response);
});

app.get('/video', function (req, res) {

    try {
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range Header");
        }
        const videoPath = __dirname + "\\TestVideo.mp4";
        const videoSize = fs.statSync(__dirname + "\\TestVideo.mp4").size;
        const CHUNK_SIZE = 10 ** 6; //1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
    
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        }
        res.writeHead(206, headers); //partial content
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);   
    } catch (error) {
       console.log(error) ;
    }
});
//#endregion

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    logger.Log("Server started.");
});

