var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('handlebars');
var geocoder = require('geocoder');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/birds2';
var ObjectId = require('mongodb').ObjectId;

var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

MongoClient.connect(mongoUrl, function(err, database){
  if(err){
    console.log(err);
  }
  db = database;
  process.on("exit", db.close); 
});


app.get('/', function(req, res){
  res.render('index');
});

app.get('/sightings', function(req, res){
  db.collection('sightings').find({}).limit(3).sort({date: -1}).toArray(function(err, result){
      result.date = Date();
    res.json(result);
    });
});

app.get('/sightings/new', function(req, res){
  res.render ('form');
});

app.post('/sightings', function(req, res){
  geocoder.geocode(req.body.location, function ( err, result ){
    var latLong = result.results[0].geometry.location;
    db.collection('sightings').insert({
      date: Date (),
      species: req.body.species,
      gender: req.body.gender,
      location: req.body.location,
      lat_long: latLong
    },function(err, result){
    });
  });
  res.redirect('/');
});

app.get('/demo', function(req, res){
  res.render('demo');
});

app.get('/demo/sightings', function(req, res){
  db.collection('sightings').find({}).sort({date: -1}).toArray(function(err, result){
    res.json(result);
  });
});

app.post('/demo', function(req, res){
  geocoder.geocode(req.body.location, function ( err, result ){
    var latLong = result.results[0].geometry.location;
    console.log(latLong);
  },function(err, result){
  });
  res.end();
});


app.listen(process.env.PORT || 3000);

