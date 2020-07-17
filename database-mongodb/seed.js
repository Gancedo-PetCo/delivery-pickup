const connect = require('./connect.js');
const insertRecords = require('./insert_records');
const mongoose = require('mongoose');

let seedDB = () => {
  connect()
  .then(() => {
    return insertRecords()
  })
  .then(() => {
    console.log('Successfully inserted images');
    mongoose.connection.close();
  })
  .catch(
    (error) => console.log(error)
  );
}

seedDB();
