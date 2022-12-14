/* const fs = require("fs"); */

var btn = document.getElementById("btn");
var loadVideo = document.getElementById("btnLoadVideo");
var img = document.getElementById("img");
var videoPlayer = document.getElementById("videoPlayer");

btn.onclick = function () {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8080/WhatAreYou",
        url: "http://localhost:3000/WhatAreYou",
        success: function (response) {
            img.src = 'data:image/png;base64,' + response;
            console.log(response);
        },
        error: function (response, status) {
            console.log(response);
        }
    });
    
}

loadVideo.onclick = function () {
    fetch("http://localhost:3000/video")
    .then((response) => response.body)
    .then(async readableStream => {
        const reader = readableStream.getReader();
        let buffer = [];
        while (1) {
            const { value, done } = await reader.read();
            if (done) {
                const blob = new Blob(buffer);
                const blobUrl = URL.createObjectURL(blob);
                videoPlayer.src = blobUrl;
                break;
            }
            buffer.push(value);
        }
    })
    .catch((err) => {
        console.error("ERROR!", err);
    });
}