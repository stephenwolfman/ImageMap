//Server.js
var express = require("express");
var logfmt = require("logfmt");
var mapimagesapi = require('./routes/mapimages');
var content = require('./routes/content');

var app = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var base64 = require('base-64');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboy()); 

app.get('/api/mapimages/sentby/:id', mapimagesapi.findBySender);
app.get('/api/mapimages/:id', mapimagesapi.findById);
app.get('/api/mapimages', mapimagesapi.findAll);
app.get('/api/markerimage', mapimagesapi.getMarkerImage);
app.get('/', content.intro);
app.get('/imagelist', content.imageList);
app.get('/imagemap', content.imageMap);
app.get('/images/:id', content.imageMap);
app.get('/imagehandler/:id', content.imageHandler);
//app.get('/api/uploader',mapimagesapi.uploader);
app.post('/api/uploader', mapimagesapi.uploader);

/*app.post("/api/uploader", async(req, res) =>{
     mapimagesapi.uploader(req, res);
});*/
//Script files
app.get("/scripts/imagemap.js", function (req, res) {
    res.sendFile(__dirname + '/scripts/imagemap.js');
});
app.get("/Scripts/jquery-1.7.1.min.js", function (req, res) {
    res.sendFile(__dirname + '/scripts/jquery-1.7.1.min.js');
});
app.get("/Scripts/jquery-ui-1.8.20.min.js", function (req, res) {
    res.sendFile(__dirname + '/scripts/jquery-ui-1.8.20.min.js');
});
app.get("/Scripts/jquery.tablescroll.js", function (req, res) {
    res.sendFile(__dirname + '/scripts/jquery.tablescroll.js');
});
app.get("/Scripts/jquery.blockUI.js", function (req, res) {
    res.sendFile(__dirname + '/scripts/jquery.blockUI.js');
});
app.get("/Scripts/jquery.popupoverlay.js", function (req, res) {
    res.sendFile(__dirname + '/scripts/jquery.popupoverlay.js');
});
app.get("/Scripts/MapImages.js", function (req, res) {
    res.sendFile(__dirname + '/scripts/MapImages.js');
});
app.get("/Content/tablescroll.css", function (req, res) {
    res.sendFile(__dirname + '/content/tablescroll.css');
});
app.get("/Content/site.css", function (req, res) {
    res.sendFile(__dirname + '/content/site.css');
});


//Get port dynamically in prod/run on 1343 dev
var port = Number(process.env.PORT || 1343);
    app.listen(port, function() {
  console.log("Listening on " + port);
});
