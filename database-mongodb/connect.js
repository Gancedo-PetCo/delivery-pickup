const mongoose = require('mongoose');
const config = require('../config.js')

function connect() {
  const mongoUri = config.mongoUri;
  return mongoose.connect(mongoUri, { useNewUrlParser: true });
}

module.exports = connect;
