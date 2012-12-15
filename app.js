var express = require('express');
var app = express();
var fs = require('fs');

var DroneNotationGenerator = require('lib/drone-notation/drone-notation');
app.use(express.static(__dirname + '/web'));
app.set('title', 'DroneML');

app.get('/fly/:code', function(req, res) {
  console.log('Received code:\n', req.params.code)
  res.send(DroneNotationGenerator.generate(req.params.code));
});

app.listen(3000);