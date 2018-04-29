var express = require('express');
var bodyParser = require('body-parser');

var entries = require('../database/connect.js');

var app = express();

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());

app.get('/entries', function(req, res) {
  entries.obtainEntries().then((data) => res.send(data));
});

app.post('/entries', function(req, res) {
  entries.addEntry(req.body.data).then(() => res.send());
});

app.put('/entries', function(req, res) {
  console.log(req.body);
  entries.updateEntry(req.body).then(() => res.send());
});

app.get('/id', function(req, res) {
  console.log('sandwich');
  console.log(req.query.id);
  console.log('sandwich');
  entries.obtainSingleEntry(req.query.id).then((data) => res.send(data));
})

app.listen(8080, function() {
  console.log('listening on port 8080!');
});
