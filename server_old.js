const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient,db;
var connectionString = 'mongodb+srv://wolfman:SilverRoverV8@azoidb.stbxu.gcp.mongodb.net/MapImages';
var database = 'MapImages';

/*
MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, database) {
  if(err) throw err;
  console.log('Connected to Database')
  db = database;
})*/

MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
	db = client.db(database);
	console.log(db)

	    db.collection('MapImages', function(err, collection) {

        collection.find().toArray(function(err, items) {
            console.log(items);
        });
    });
})

app.listen(1343, function() {
  console.log('listening on 1343')
})


app.get('/', (req, res) =>{
  res.send('Map Images 2020');

})