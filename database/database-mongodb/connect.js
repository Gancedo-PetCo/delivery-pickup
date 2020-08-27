const mongoose = require('mongoose');
const config = require('../config.js');
require('dotenv').config();

const connect = () => {
  const mongoUri = config.mongoUri;
  return mongoose.connect(mongoUri, { useNewUrlParser: true });
};

module.exports = connect;
