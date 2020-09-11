const PATH = require('path');
const Axios = require('axios');

require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });

const { removeOldData, createNewData } = require('./index.js');
const { COUCH_URL, COUCH_PWD, COUCH_USER } = process.env;
const url = `http://${COUCH_USER}:${COUCH_PWD}@${COUCH_URL}/`;
const db = 'dev';

const seed = () => {
  // console.log(COUCH_URL);
  //first delete the db

  removeOldData(url, db)
    .then(() => {
      Axios.put(url + db)
        .then(() => {
          createNewData(url, db);
        })
        .catch((err) => {
          console.error(err);
        })
    })
    .catch((err) => {
      console.error('err ', err);
    })



  // Axios.put(url + '/"0001"', {
  //   person: 'Joe'
  // })
  //   .then((data) => {
  //     console.log('succ! ', data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
};


seed();