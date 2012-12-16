var arDrone = require('ar-drone');
var express = require('express');
var app = express();
var fs = require('fs');

var DroneNotationGenerator = require(__dirname + '/lib/drone-notation/drone-notation');
var drone = arDrone.createClient();

app.use(express.static(__dirname + '/web'));
app.use(express.bodyParser());
app.set('title', 'DroneML');

app.post('/fly', function(req, res){
  console.log('Received DroneML:\n', req.body.droneML);
  var generatedCode = DroneNotationGenerator.generate(req.body.droneML);
  eval(generatedCode);
  console.log('Generated JS:\n', generatedCode);
  res.send("Running DroneML:\n" + "<pre>" + req.body.droneML + "</pre>");
});

app.post('/debug', function(req, res){
  console.log('Received DroneML:\n', req.body.droneML);
  var generatedCode = DroneNotationGenerator.generate(req.body.droneML);
  console.log('Generated JS:\n', generatedCode);
  res.send("<pre>" + generatedCode + "</pre>");
});

app.listen(3000);
