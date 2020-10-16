var MongoClient = require('mongodb').MongoClient,mapImagesDB,imageStoreDB;
var connectionString = 'mongodb+srv://wolfman:SilverRoverV8@azoidb.stbxu.gcp.mongodb.net';
//var connectionString = 'mongodb+srv://wolfman:SilverRoverV8@azoicluster.onkmd.mongodb.net';///heroku_app27229592?retryWrites=true&w=majority';
var database = 'MapImages';
var imageDatabase = 'ImageStore';
var collections = ["MapImages"]

const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");


var mongoClient;// = new MongoClient(new Server('localhost', 27017));
var stream = require('stream');
var base64 = require('base-64');


//imaging
var ExifImage = require('exif').ExifImage;


// Initialize connection once
MongoClient.connect(connectionString, function(err, client) {
  if(err) throw err;

  mapImagesDB = client.db(database);
  console.log('mapImagesDB established');
  imageStoreDB = client.db(imageDatabase);
  console.log('imageStoreDB established');
  
});

exports.intro = function(req, res) {
    res.send('Map Images Node app');
};
 
exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    mapImagesDB.collection('MapImages', function(err, collection) {
        collection.findOne({'MapImageId': id}, function(err, item) {
            //console.log(item);
            res.jsonp(item);
        });
    });
};


exports.findAll = function(req, res) {
    console.log('Find All');
    mapImagesDB.collection('MapImages', function(err, collection) {

        collection.find().toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};

exports.findBySender = function(req, res) {
    console.log(req.params);
    var sender = req.params.id;
    console.log('findBySender: ' + sender);
    mapImagesDB.collection('MapImages', function(err, collection) {
        collection.find({"SentBy": sender}).toArray(function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

exports.getMarkerImage = function(req, res) {
    console.log(req.params);
    //console.log(db);
    //db = client.db('ImageStore');
    imageStoreDB.collection('ImageStore', function(err, collection) {
        collection.findOne({'ImageStoreId': 'MapImage1','ImageType': 'Marker'}, function(err, doc) {
            res.jsonp(doc);
        });
    });
};




exports.uploader = async function(req, res){
    //console.log(res);
    var imgBuffer = req.files.file0.data;
    var imageName;
    var imgLat;
    var imgLng;
    var imgExifData;

    //ImageGPSDataReturn(res,imgBuffer);
    //const ret = await ImageGPSDataReturn(imgBuffer)
    //ImageGPSDataReturn(imgBuffer).then(value =>{console.log(value);res.jsonp(value)})
    ImageGPSDataReturn(imgBuffer)
      .then(value => {
        console.log(value) // 1
      })
};

ImageGPSDataReturn = async (imgBuffer) =>{

    try {
    new ExifImage({ image : imgBuffer }, function (error, exifData) {

        console.log(error);
        if (error){
            console.log('Error: '+error.message);
          }
        else{
            console.log(exifData); // Do something with your data!
            imgExifData = exifData;

            imgLat = imgExifData.gps.GPSLatitude;
            imgLng = imgExifData.gps.GPSLongitude;

             var objLatLng = new Object();
             objLatLng.imgLat = imgLat;
             objLatLng.imgLng  = imgLng;
            //uploadReturn(res,objLatLng);
            console.log(objLatLng);
            return objLatLng;
          }
    });
    } catch (error) {
        console.log('Error: ' + error.message);
    }

};

/*
ImageGPSDataReturn = function(res,imgBuffer){

    try {
    new ExifImage({ image : imgBuffer }, function (error, exifData) {

        console.log(error);
        if (error){
            console.log('Error: '+error.message);
            res.end();
          }
        else{
            console.log(exifData); // Do something with your data!
            imgExifData = exifData;

            imgLat = imgExifData.gps.GPSLatitude;
            imgLng = imgExifData.gps.GPSLongitude;

             var objLatLng = new Object();
             objLatLng.imgLat = imgLat;
             objLatLng.imgLng  = imgLng;
            //uploadReturn(res,objLatLng);
            res.jsonp(objLatLng);
          }
    });
    } catch (error) {
        console.log('Error: ' + error.message);
    }

};
*/

exports.uploadReturn = function(res,objLatLng){
    res.jsonp(objLatLng);
};



