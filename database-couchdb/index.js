
const axios = require('axios');
const PATH = require('path');
require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });


const { COUCH_URL, COUCH_PWD, COUCH_USER, COUCH_DB } = process.env;
const url = `http://${COUCH_USER}:${COUCH_PWD}@${COUCH_URL}/${COUCH_DB}`;
const startId = 100;

exports.getData = (itemId) => {
  return axios.post(url + '/_find',
    {
      'selector': {
        _id: {
          '$eq': itemId
        }
      },
      'fields': ['itemId', 'itemAvailability'],
      'limit': 1,
    }
  );
};

exports.updateData = (itemId, info) => {
  return axios.put(url + `/${itemId}`, info);
};

exports.deleteData = (itemId) => {
  return axios.delete(url + `/${itemId}`);
};

exports.addData = async (data) => {
  let id = await axios.get(url);
  return axios.put(url + `/${id + startId}`, data);
};