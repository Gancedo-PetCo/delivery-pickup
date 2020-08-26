const mongoose = require('mongoose');
const config = require('../config.js');

const connect = () => {
  const mongoUri = config.mongoUri;
  return mongoose.connect(mongoUri, { useNewUrlParser: true });
};

module.exports = connect;
