var btn = document.getElementById("btn");
var img = document.getElementById("img");

btn.onclick = function () {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8080/WhatAreYou",
        url: "http://localhost:8080/WhatAreYou",
        success: function (response) {
            img.src = 'data:image/png;base64,' + response;
            console.log(response);
        },
        error: function (response, status) {
            console.log(response);
        }
    });
    
}