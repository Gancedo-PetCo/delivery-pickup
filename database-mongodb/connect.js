const mongoose = require('mongoose');

function connect() {
  const mongoUri = 'mongodb://localhost/itemAvailability';
  return mongoose.connect(mongoUri, { useNewUrlParser: true });
}

module.exports = connect;
