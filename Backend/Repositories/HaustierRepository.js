const mysql = require("mysql2");
const Logger = require("../Logger");
const path = require("path");
//const bcrypt = require("bcrypt");
//const Utils = require("../utils.js");
var nconf = require("nconf");
const { resolve } = require("path");

//setup Logger
const logger = new Logger();

//declare and set some local variables
let user = "user";
let password = "password";
let host = "host";
let database = "database"; //will be read from config.json

//#region setup config
// First consider commandline arguments and environment variables, respectively.
nconf.argv().env();

// Then load configuration from a designated file.
nconf.file({
    file: path.join(__dirname, "..", "config.json")
});
//console.log(nconf);
//#endregion

//read from config.json
var sqlDbData = {};
if (nconf.get("MyFirstExpressAPI:enviroment") === "LOCAL") {
    sqlDbData = nconf.get("sqlLOCAL");
} else if (nconf.get("MyFirstExpressAPI:enviroment") === "LIVE") {
    sqlDbData = nconf.get("sqlLIVE");
}
user = sqlDbData.user;
password = sqlDbData.password;
host = sqlDbData.host;
database = sqlDbData.database;
//console.log(user + '-' + database + '-' + host + '-' +  + password);

//create Connection to tb
const connection = mysql.createConnection({
    host: host,
    user: user,
    database: database,
    password: password,
});

class HaustierRepository {
    GetHaustierData = async function () {
        const Haustiere = await new Promise((resolve, reject) => {

            connection.query( "SELECT ID,Tierart, Name, AlterInJahren FROM haustiere",
                [], //parameters wich are used to fill in ?-Chars in query-String 
                function (err, result, fields) {
                    try {
                        console.log(result);
                        resolve(result);
                    } catch {
                        logger.err("GetHaustierData failed | " + err)
                        resolve("");
                    }
                }
            );
        })

        return Haustiere;

    }
}
module.exports = HaustierRepository;