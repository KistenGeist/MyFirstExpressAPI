const fs = require("fs");
const LogTypes = {
    Err: "Error",
    Warn: "Warning",
    Info: "Info" 
}

class Logger {
    
    Log = function (content){
        this.ApeendToLog(content, LogTypes.Info);
    }

    Warn = function (content){
        this.ApeendToLog(content, LogTypes.Warn);
    }

    Err = function (content){
        this.ApeendToLog(content, LogTypes.Err);
    }

    ApeendToLog = function (content, type) {
        console.log(content);
        try{

            fs.appendFile('./logs/Log_' + this.GetDateForFileName() + '.txt', type + '\t' + this.GetTime() + ': ' + content + '\n', err => {
                if (err) {
                    console.log(err);
                }
            })
        }catch (err){
            console.log(err);
        }
    }

    GetDateForFileName = function () {
        let tempDate = new Date();
        let year = tempDate.getFullYear();
        let month = tempDate.getMonth() + 1;
        let day = tempDate.getDate().toString();
        day = day.length === 1 ? "0" + day : day;

        return year + '-' + month + '-' + day;
    }

    GetTime = function () {
        let tempDate = new Date();
        return tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
    }
}
module.exports = Logger;