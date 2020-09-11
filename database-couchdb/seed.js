const PATH = require('path');
const Axios = require('axios');

require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });

const { removeOldData, createNewData } = require('./index.js');
const { COUCH_URL, COUCH_PWD, COUCH_USER } = process.env;
const url = `http://${COUCH_USER}:${COUCH_PWD}@${COUCH_URL}/`;
const db = 'dev';

const seed = () => {

  //first delete the db
  removeOldData(url, db)
    .then(() => {
      Axios.put(url + db)
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