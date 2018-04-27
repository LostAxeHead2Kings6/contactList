var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts', {
  useMongoClient: true
});

var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var entrySchema = mongoose.Schema({
  firstname: {type: String, maxlength: 30},
  lastname: {type: String, maxlength: 30},
  email: {type: String, maxlength: 50}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var Entry = mongoose.model('Entry', entrySchema);

var obtainEntries = function(callback) {
  return Entry.find({});
};

var addEntry = function() {
  Entry.create({firstname: "Rumple", lastname: "Stillskin", email: "rstizzle@gmail.com"}, function(err, success) {
      if (err) return handleError(err);
  });
};

module.exports.addEntry = addEntry;
module.exports.obtainEntries = obtainEntries;
