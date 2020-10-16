
var mustache = require("mustache");
var fs = require("fs");

var MongoClient = require('mongodb').MongoClient,mapImagesDB,imageStoreDB;
var connectionString = 'mongodb+srv://wolfman:SilverRoverV8@azoidb.stbxu.gcp.mongodb.net';
/*var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;*/

//var databaseUrl = "mongodb+srv://wolfman:SilverRoverV8@azoidb.stbxu.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"//"mongodb://wolfman:SilverRoverV8@ds027489.mongolab.com:27489/heroku_app27229592"; //"mongodb://wolfman:SilverRoverV8@ds027489.mongolab.com:27489/heroku_app27229592"; "username:password@example.com/mydb"
//var databaseUrl = "mongodb://wolfman:SilverRoverV8@ds027489.mongolab.com:27489/heroku_app27229592"; //"mongodb://wolfman:SilverRoverV8@ds027489.mongolab.com:27489/heroku_app27229592"; "username:password@example.com/mydb"
var collections = ["MapImages"]
var imageDatabase = 'ImageStore';
var database = 'MapImages';
//var mongoClient;// = new MongoClient(new Server('localhost', 27017));

// Initialize connection once
MongoClient.connect(connectionString, function(err, client) {
  if(err) throw err;

  mapImagesDB = client.db(database);
  console.log('mapImagesDB established');
  imageStoreDB = client.db(imageDatabase);
  console.log('imageStoreDB established');
});



exports.intro = function(req, res) {
    res.send("Map Images App");
};
 



exports.imageList = function(req, res) {
    //var html = mustache.to_html(template, view);
    var imageData;
    var filename = "./html/list.html";
    var mapImagesData = {"MapImageData":{}};
    mapImagesDB.collection('MapImages', function(err, collection) {

        collection.find().toArray(function(err, items) {
            mapImagesData['MapImages'] = items;
            fs.readFile(filename, "utf8", function(err, data) {
                if (err) throw err;
                var html = mustache.render(data, mapImagesData);
                res.send(html);
            });
        });
    });
    
};



exports.imageMap = function(req, res) {

    var filename = "./html/imagemap.html";

    fs.readFile(filename, "utf8", function(err, data) {
        if (err) throw err;
        res.send(data);
    });
    
};

exports.imageMap1 = function(req, res) {

    var filename = "./html/imagemap.html";

    var id = parseInt(req.params.id);
    console.log('findById1: ' + id);
    fs.readFile(filename, "utf8", function(err, data) {
        if (err) throw err;
        console.log("Send Data")
        res.send(data);
    });
    
};

exports.imageHandler = function (req, res, next) {

    var id = req.params.id;
    console.log('findById2: ' + id);
    imageStoreDB.collection('ImageStore', function(err, collection) {
        collection.findOne({'ImageStoreId': id}, function(err, doc) {
              if (err) return next(err);
              console.log("Serve up image");
              //res.contentType(doc.ContentType);
              //res.send(doc.data);
              //res.contentType('image/png');
              //res.send(doc.data);
  //              res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<img src="data:image/png;base64,')
  res.write(new Buffer(doc.data).toString());
  res.end('"/>');
                //res.contentType('image/png');
              //res.send(new Buffer(doc.data).toString());
        });
    });
};



