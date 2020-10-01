const PATH = require('path');
const axios = require('axios');

require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });

const { removeOldData, createNewData } = require('./datagen.js');
const { COUCH_URL, COUCH_PWD, COUCH_USER } = process.env;
const url = `http://${COUCH_USER}:${COUCH_PWD}@${COUCH_URL}/`;
const db = 'dev';

const seed = () => {

  //first delete the db
  removeOldData(url, db)
    .then(() => {
      axios.put(url + db)
        .then(() => {
          //then seed db
          createNewData(url, db);
        })
        .catch((err) => {
          console.error(err);
        })
    })
    .catch((err) => {
      console.error('err ', err);
    })
};

seed();