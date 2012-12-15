var arDrone = require('ar-drone');
var express = require('express');
var app = express();
var fs = require('fs');

var DroneNotationGenerator = require(__dirname + '/lib/drone-notation/drone-notation');
var drone  = arDrone.createClient();

app.use(express.static(__dirname + '/web'));
app.set('title', 'DroneML');

app.get('/fly/:code', function(req, res) {
  console.log('Received code:\n', req.params.code)
  var generatedCode = DroneNotationGenerator.generate(req.params.code);
  eval(generatedCode);
  res.send("Running DroneML:\n" + req.params.code);
});

app.get('/debug/:code', function(req, res) {
  console.log('Received DroneML:\n', req.params.code)
  var generatedCode = DroneNotationGenerator.generate(req.params.code);
  console.log('Generated JS:\n', generatedCode);
  res.send("<pre>" + generatedCode + "</pre>");
});

app.listen(3000);