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
  email: {type: String, maxlength: 50},
  phone: {type: String, maxLength:12}
}, {
    versionKey: false
});

var Entry = mongoose.model('Entry', entrySchema);

var obtainEntries = function(callback) {
  return Entry.find({}).sort({lastname: +1});
};

var obtainSingleEntry = function(id) {
  return Entry.find({_id: id})
}

var addEntry = function(object) {
  return Entry.create({firstname: object.first, lastname: object.last, email: object.email, phone: object.phone});
};

var updateEntry = function(object) {
  return Entry.updateOne(
    {_id: object.id},
    { $set:
      {
        firstname: object.firstname,
        lastname: object.lastname,
        email: object.email,
        phone: object.phone
      }
    }
  )
}

var deleteListing = function(id) {
  return Entry.findByIdAndRemove(id);
}

module.exports.addEntry = addEntry;
module.exports.obtainEntries = obtainEntries;
module.exports.updateEntry = updateEntry;
module.exports.obtainSingleEntry = obtainSingleEntry;
module.exports.deleteListing = deleteListing;
