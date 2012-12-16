var arDrone = require('ar-drone');
var express = require('express');
var app = express();
var fs = require('fs');

var DroneNotationGenerator = require(__dirname + '/lib/drone-notation/drone-notation');
var drone = arDrone.createClient();

app.use(express.static(__dirname + '/web'));
// app.use(express.bodyParser());
app.set('title', 'DroneML');

app.get('/fly', function(req, res){
  console.log('FLY received DroneML:\n', (req.query));
  var generatedCode = DroneNotationGenerator.generate(decodeURIComponent(req.query.droneML));
  eval(generatedCode);
  console.log('Generated JS:\n', generatedCode);
  res.send("Running DroneML:\n" + "<pre>" + req.params.droneML + "</pre></br>" + "Generated JS:" + generatedCode + "</pre></br>" );
});

app.get('/debug/:droneML', function(req, res){
  console.log('Received DroneML:\n', req.params.droneML);
  var generatedCode = DroneNotationGenerator.generate(req.params.droneML);
  console.log('Generated JS:\n', generatedCode);
  res.send("<pre>" + generatedCode + "</pre>");
});

app.listen(3000);
