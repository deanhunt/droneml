var express = require('express');
var app = express();
var fs = require('fs');

var DroneNotationGenerator = require('lib/drone-notation/drone-notation');
app.use(express.static(__dirname + '/web'));
app.set('title', 'DroneML');

app.post('/generate', function(req, res) {
  res.send('hello world ' + req.data);
});

app.listen(3000);