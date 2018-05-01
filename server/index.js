var express = require('express');
var bodyParser = require('body-parser');

var db = require('../database/connect.js');

var app = express();

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());

app.get('/entries', function(req, res) {
  db.obtainEntries()
  .then((data) => res.send(data));
});

app.post('/entries', function(req, res) {
  db.addEntry(req.body.data).then(() => res.send());
});

app.put('/entries', function(req, res) {
  db.updateEntry(req.body).then(() => res.send());
});

app.delete('/entries', function(req, res) {
  db.deleteListing(req.query._id)
  .then(() => db.obtainEntries()
  .then((data) => res.send(data)));
})

app.get('/id', function(req, res) {
  db.obtainSingleEntry(req.query.id).then((data) => res.send(data));
})

app.listen(8080, function() {
  console.log('listening on port 8080!');
});
