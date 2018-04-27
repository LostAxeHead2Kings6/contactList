var express = require('express');
var bodyParser = require('body-parser');

var entries = require('../database/connect.js');

var app = express();

app.use(express.static(__dirname + '/../angular-client'));
app.use(bodyParser.json());

app.get('/entries', function(req, res) {
  entries.obtainEntries().then((data) => res.send(data));
});

app.post('/entries', function(req, res) {
  entries.addEntry();
});

app.listen(8080, function() {
  console.log('listening on port 8080!');
});
