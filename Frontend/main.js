var btn = document.getElementById("btn");
var loadVideo = document.getElementById("btnLoadVideo");
var img = document.getElementById("img");
var videoPlayer = document.getElementById("videoPlayer");
var videoSource = document.createElement("source");
videoSource.setAttribute('src', 'http://techslides.com/demos/sample-videos/small.mp4');
videoSource.setAttribute("type", "video/mp4");

videoPlayer.appendChild(videoSource);
videoPlayer.play();

setTimeout(function(){
    videoPlayer.pause();

    videoSource.setAttribute('src', 'http://techslides.com/demos/sample-videos/small.webm');
    videoSource.setAttribute('type', 'video/webm');
    videoPlayer.load();
    videoPlayer.play();
    console.log({
      src: videoSource.getAttribute('src'),
      type: videoSource.getAttribute('type'),
    });
  }, 3000);

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
    $.ajax({
        type: "GET",
        //url: "http://localhost:8080/WhatAreYou",
        url: "http://localhost:3000/video",
        headers: {
            Range: "bytes=0-10"
        },
        success: function (response) {
            videoPlayer.src = response;
            //console.log(response);
        },
        error: function (response, status) {
            console.log(response);
        }
    });
    
}