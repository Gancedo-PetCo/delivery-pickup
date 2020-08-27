const connect = require('./connect.js');
const insertRecords = require('./insert_records');
const { ItemAvailability, Store } = require('./itemAvailability.js');
const mongoose = require('mongoose');

const seedDB = () => {
  connect()
    .then(() => {
      return Store.deleteMany();
    })
    .then(() => {
      return ItemAvailability.deleteMany();
    })
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
