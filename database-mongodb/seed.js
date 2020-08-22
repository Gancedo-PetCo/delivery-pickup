const connect = require('./connect.js');
const insertRecords = require('./insert_records');
const mongoose = require('mongoose');

const seedDB = () => {
  connect()
    .then(() => {
      return insertRecords();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(
      (error) => console.log(error)
    );
};

seedDB();
