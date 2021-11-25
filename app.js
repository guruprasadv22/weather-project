const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")  
});

app.post("/", function(req, res) {
    //console.log("Post request received");
    //res.send(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "ba727c8e779d529cfdf820c7e405918f"
    const units = "metric"
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "#";

    https.get(url, function(response) {
    //res.send(response);

        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            const weatherDesc = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDesc + "<p>");
            res.write("<h1>The temperature in London is " + temp + " degrees Celsius</h1>");
            res.write("<img src = " + imageUrl + ">");
            res.send();
        })
    });

});




app.listen(3002, function() {
    console.log("Server is running on port 3002");
})